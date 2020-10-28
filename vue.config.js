const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const cdnConfig = require('./cdn.config');

// 基础路径 注意发布之前要先修改这里
const publicPath = process.env.VUE_APP_PUBLIC_PATH || '/';

// 多页配置，默认未开启，如需要请参考 https://cli.vuejs.org/zh/config/#pages
const pages = undefined;
// const pages = {
//   index: './src/main.js',
//   subpage: './src/subpage.js',
// };

// 设置不参与构建的库
const externals = cdnConfig.reduce((res, pkg) => {
  res[pkg.name] = pkg.library;
  return res;
}, {});

// 引入文件的 cdn 链接
const cdn = {
  css: cdnConfig.map(pkg => pkg.css).filter(i => !!i),
  js: cdnConfig.map(pkg => pkg.js).filter(i => !!i),
};

module.exports = {
  pages,
  publicPath,
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,

  devServer: {
    open: false,
    overlay: {
      warnings: true,
      rrors: true,
    },
    // 和 publicPath 保持一致
    publicPath,
    // 关闭 host check，方便使用 ngrok 之类的内网转发工具
    disableHostCheck: process.env.NODE_ENV === 'development',
    // proxy: {},
  },

  configureWebpack: {
    name: process.env.VUE_APP_TITLE,
    externals,
  },

  // 默认设置: https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-service/lib/config/base.js
  chainWebpack (config) {
    // 添加 CDN 参数到 htmlWebpackPlugin 配置中, 已适配多页
    const htmlPluginNames = Object.keys(pages || {}).map(page => 'html-' + page);
    (htmlPluginNames.length ? htmlPluginNames : ['html']).forEach(name => {
      config.plugin(name).tap(options => {
        options[0].cdn = cdn;
        return options;
      });
    });

    /**
     * 删除懒加载模块的 prefetch preload，降低带宽压力
     * @link https://cli.vuejs.org/zh/guide/html-and-static-assets.html#prefetch
     * @link https://cli.vuejs.org/zh/guide/html-and-static-assets.html#preload
     * @description 预渲染时生成的 prefetch 标签是 modern 版本的，低版本浏览器是不需要的
     */
    config.plugins
      .delete('prefetch')
      .delete('preload');

    // 解决 cli3 热更新失效 https://github.com/vuejs/vue-cli/issues/1559
    config.resolve.symlinks(true);

    config.when(
      process.env.NODE_ENV !== 'development',
      config => {
        // 开发环境 sourcemap 不包含列信息
        config.devtool('cheap-source-map');

        // gzip 压缩
        config
          .plugin('compressionPlugin')
          .use(
            new CompressionWebpackPlugin({
              filename: '[path].gz[query]',
              test: /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i,
              algorithm: 'gzip',
              threshold: 10240,
              minRatio: 0.8,
              deleteOriginalAssets: false,
            }),
          );

        // 分析工具
        config.plugin('webpack-bundle-analyzer').use(BundleAnalyzerPlugin);
      },
    );
  },
};
