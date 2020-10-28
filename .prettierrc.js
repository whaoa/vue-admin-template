/**
 * 如果您使用 VS Code 进行开发，推荐您使用 ESLint + Prettier Now 并使用以下配置项
 * https://github.com/remimarsal/prettier-now-vscode
 */

module.exports = {
  // 单行最大长度
  printWidth: 120,
  // 是否使用制表符进行缩进
  useTabs: false,
  // 缩进大小
  tabWidth: 2,
  // 在语句末尾添加分号
  semi: true,
  // 使用单引号
  singleQuote: true,
  // 不使用尾逗号
  trailingCommas: 'none',
  // 对象字面量花括号内是否需要空格
  bracketSpacing: true,
  // 箭头函数参数尽量不使用圆括号
  alwaysParens: 'avoid',
  // 换行符
  endOfLine: 'auto',
  // 在函数括号前放置一个空格。
  spaceBeforeParen: true,
};
