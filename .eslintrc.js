// rules 中每个配置项后面第一个值是 ESLint 规则的错误等级。
// - off 或 0: 关闭这条规则
// - warn 或 1: 不符合规则时作为一个警告 (不会影响退出码）(不会影响项目运行)
// - error 或 2: 不符合规则时视作一个错误 (退出码为1) (屏幕上一堆错误代码)

// 临时在一段代码中取消eslint检查，可以如下设置：
// /* eslint-disable */
// alert('foo');
// /* eslint-enable */

// 临时在一段代码中取消个别规则的检查（如no-alert, no-console），两行注释中间的内容将会忽略制定的规则检查
// /* eslint-disable no-alert, no-console */
// alert('foo');
// console.log('bar');
// /* eslint-enable no-alert, no-console */

// 单个文件配置
// 在整个文件中取消eslint检查：/* eslint-disable */
// 在整个文件中禁用某一项规则的检查：/* eslint-disable no-alert */
// 在整个文件中禁用多项规则的检查：alert('foo'); // eslint-disable no-alert, quotes, semi

// 单行配置
// 针对某一行禁用eslint检查：alert('foo'); // eslint-disable-line
// 针对某一行禁用某一规则检查：alert('foo'); // eslint-disable-line no-alert
// 针对某一行禁用多项规则的检查：alert('foo'); // eslint-disable-line no-alert, quotes, semi

// 配置下一行
// // eslint-disable-next-line
// alert('foo');
// // eslint-disable-next-line no-alert
// alert('foo');
// // eslint-disable-next-line no-alert, quotes, semi
// alert('foo');

const NOT_PROD = process.env.NODE_ENV !== 'production';

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
  },
  extends: [
    // @vue/cli 项目
    'plugin:vue/recommended',
    'eslint:recommended',
    // @nuxt/cli 项目
    // '@nuxtjs',
    // 'plugin:nuxt/recommended',
  ],
  overrides: [
    {
      files: [
        "**/__tests__/*.{j,t}s?(x)",
        "**/tests/unit/**/*.spec.{j,t}s?(x)"
      ],
      env: {
        jest: true
      }
    }
  ],
  rules: {
    // Vue 相关配置。文档: https://eslint.vuejs.org/

    // Vue 行内属性配置
    'vue/max-attributes-per-line': ['error', {
      // 在单行情况下可接受的属性数量。默认值为1。
      'singleline': 10,
      'multiline': {
        // 在多行情况下每行可接受的属性数量。默认值为1。
        'max': 1,
        'allowFirstLine': false,
      },
    }],
    // 在单行元素的内容之前和之后需要换行
    'vue/singleline-html-element-content-newline': 'off',
    // 在多行元素的内容之前和之后需要换行
    'vue/multiline-html-element-content-newline': 'off',
    // 改配置将在之后版本被废弃
    // 'vue/name-property-casing': ['error', 'PascalCase'],
    // 对组件定义名称强制使用特定的大小写，允许 PascalCase
    'vue/component-definition-name-casing': ['off', 'PascalCase'],
    // 禁用 v-html 指令
    'vue/no-v-html': 'off',

    // 基础风格配置
    // 强制在代码块中开括号前和闭括号后有空格
    'block-spacing': 'error',
    // 大括号风格要求, 保持一个空格，允许在同行书写
    'brace-style': ['error', '1tbs', { 'allowSingleLine': true }],
    // 要求使用骆驼拼写法
    'camelcase': ['warn', {
      'properties': 'never',
      'ignoreDestructuring': true,
    }],
    // 要求使用拖尾逗号
    // 当最后一个元素或属性与闭括号 ] 或 } 在 不同的行时，要求使用拖尾逗号；当在 同一行时，禁止使用拖尾逗号
    'comma-dangle': ['error', 'always-multiline'],
    // 强制在逗号周围使用空格
    'comma-spacing': ['error', { 'before': false, 'after': true }],
    // 逗号风格: 要求逗号放在数组元素、对象属性或变量声明之后，且在同一行
    'comma-style': ['error', 'last'],
    // 多行代码块必须使用大括号包裹
    'curly': ['error', 'multi-line'],
    // 点号之前或之后换行: 表达式中的点号操作符应该和属性在同一行
    'dot-location': ['error', 'property'],
    // 空文件后保留一行空行
    'eol-last': 'error',
    // 使用 严格运算符，而非相等运算符
    'eqeqeq': ['error', 'always', { 'null': 'ignore' }],
    // 强制回调错误处理
    'handle-callback-err': ['error', '^(e|err|error)$'],
    // 强制使用 2个空格 作为缩进
    'indent': ['error', 2, {
      'SwitchCase': 1,
      'VariableDeclarator': 'first',
    }],
    // 强制所有不包含双引号的 JSX 属性值使用双引号
    'jsx-quotes': ['error', 'prefer-double'],
    // 对象字面量的冒号和值之间存在至少有一个空格
    'key-spacing': ['error', { 'beforeColon': false, 'afterColon': true }],
    // 关键字周围空格的一致性
    'keyword-spacing': ['error', { 'before': true, 'after': true }],
    // 要求构造函数首字母大写
    'new-cap': ['error', { 'newIsCap': true, 'capIsNew': false }],
    // 强制或禁止调用无参构造函数时有圆括号
    'new-parens': 'error',
    // 禁用使用 Array 构造函数
    'no-array-constructor': 'error',
    // 禁用 arguments.caller 或 arguments.callee
    'no-caller': 'error',
    // 禁用 console
    'no-console': NOT_PROD ? 'off' : 'error',
    // 'no-console': 'off',
    // 禁止条件表达式中出现赋值操作符
    'no-cond-assign': 'error',
    // 禁止在正则表达式中使用控制字符
    'no-control-regex': 'error',
    // 禁止删除变量
    'no-delete-var': 'error',
    // 禁止定义中出现重复的参数
    'no-dupe-args': 'error',
    // 不允许类成员中有重复的名称
    'no-dupe-class-members': 'error',
    // 禁止对象字面量中出现重复的 key
    'no-dupe-keys': 'error',
    // 禁止重复 case 标签
    'no-duplicate-case': 'error',
    // 禁止在正则表达式中使用空字符集
    'no-empty-character-class': 'error',
    // 禁用 eval()
    'no-eval': 'error',
    // 禁止对 catch 子句的参数重新赋值
    'no-ex-assign': 'error',
    // 禁止扩展原生类型
    'no-extend-native': 'error',
    // 禁止不必要的 .bind() 调用
    'no-extra-bind': 'error',
    // 禁用不必要的标签
    'no-extra-boolean-cast': 'error',
    // 禁止不必要的括号
    'no-extra-parens': ['error', 'functions'],
    // 禁止 case 语句落空
    'no-fallthrough': 'error',
    'no-floating-decimal': 'error',
    // 禁止数字字面量中使用前导和末尾小数点
    'no-func-assign': 'error',
    // 禁用隐式的eval()
    'no-implied-eval': 'error',
    // 禁止在嵌套的语句块中出现变量或 function 声明
    'no-inner-declarations': ['error', 'functions'],
    // 禁止 RegExp 构造函数中存在无效的正则表达式字符串
    'no-invalid-regexp': 'error',
    // 禁止不规则的空白
    'no-irregular-whitespace': 'error',
    // 禁用 __iterator__ 属性
    'no-iterator': 'error',
    // 不允许标签与变量同名
    'no-label-var': 'error',
    // 禁用标签语句
    'no-labels': ['error', {
      'allowLoop': false,
      'allowSwitch': false,
    }],
    // 禁用不必要的嵌套块
    'no-lone-blocks': 'error',
    // 禁止空格和 tab 的混合缩进
    'no-mixed-spaces-and-tabs': 'error',
    // 禁止使用多个空格
    'no-multi-spaces': 'error',
    // no-multi-str
    'no-multi-str': 'error',
    // 禁止出现多行空行
    'no-multiple-empty-lines': ['error', { 'max': 1 }],
    // 禁止对原生对象或只读的全局对象进行赋值
    'no-global-assign': 'error',
    // 禁止对关系运算符的左操作数使用否定操作符
    'no-unsafe-negation': 'error',
    // 禁用 Object 的构造函数
    'no-new-object': 'error',
    // 禁止调用 require 时使用 new 操作符
    'no-new-require': 'error',
    // 禁止 Symbol 和 new 一起使用
    'no-new-symbol': 'error',
    // 禁止对 String，Number 和 Boolean 使用 new 操作符
    'no-new-wrappers': 'error',
    // 禁止把全局对象作为函数调用
    'no-obj-calls': 'error',
    // 禁用八进制字面量
    'no-octal': 'error',
    // 禁止在字符串中使用八进制转义序列
    'no-octal-escape': 'error',
    // 禁止对 __dirname 和 __filename 进行字符串连接
    'no-path-concat': 'error',
    // 禁用 __proto__ 属性
    'no-proto': 'error',
    // 禁止多次声明同一变量
    'no-redeclare': 'error',
    // 禁止正则表达式字面量中出现多个空格
    'no-regex-spaces': 'error',
    // 禁止在 return 语句中使用赋值语句
    'no-return-assign': ['error', 'except-parens'],
    // 禁止自我赋值
    'no-self-assign': 'error',
    // 禁止自身比较
    'no-self-compare': 'error',
    // 允许使用逗号操作符
    'no-sequences': 'off',
    // 禁止使用关键字作为变量名
    'no-shadow-restricted-names': 'error',
    // 禁止在函数调用时函数名与小括号之间存在空格
    'func-call-spacing': 'error',
    // 禁用稀疏数组: 如 [ "red",, "blue" ];
    'no-sparse-arrays': 'error',
    // 禁止抛出异常字面量
    'no-throw-literal': 'error',
    // 禁用行尾空格
    'no-trailing-spaces': 'error',
    // 禁用未声明的变量，除非它们在 /*global */ 注释中被提到
    'no-undef': 'error',
    // 禁止将变量初始化为 undefined
    'no-undef-init': 'error',
    // 禁止可能造成歧义的无分号多行表达式
    'no-unexpected-multiline': 'error',
    // 禁用一成不变的循环条件
    'no-unmodified-loop-condition': 'error',
    // 禁止可以在有更简单的可替代的表达式时使用三元操作符
    'no-unneeded-ternary': ['error', {
      'defaultAssignment': false,
    }],
    // 禁止在 return、throw、continue 和 break 语句之后出现不可达代码
    'no-unreachable': 'error',
    // 禁止在 finally 语句块中出现控制流语句
    'no-unsafe-finally': 'error',
    // 禁止出现未使用过的变量
    'no-unused-vars': ['error', {
      'vars': 'all',
      'args': 'none',
    }],
    // 禁止不必要的 .call() 和 .apply()
    'no-useless-call': 'error',
    // 禁止在对象中使用不必要的计算属性
    'no-useless-computed-key': 'error',
    // 禁用不必要的转义字符
    'no-useless-escape': 'warn',
    // 禁止属性前有空白
    'no-whitespace-before-property': 'error',
    // 禁用 with 语句
    'no-with': 'error',
    // 强制函数中的变量要么一起声明要么分开声明
    'one-var': ['error', {
      'initialized': 'never',
    }],
    // 要求把换行符放在操作符后面
    'operator-linebreak': ['error', 'after', {
      'overrides': {
        '?': 'before',
        ':': 'before',
      },
    }],
    // 禁止块语句和类的开始或末尾有空行
    'padded-blocks': ['error', 'never'],
    // 强制使用单引号
    'quotes': ['error', 'single', {
      'avoidEscape': true,
      'allowTemplateLiterals': true,
    }],
    // 要求或禁止使用分号代替 ASI
    'semi': ['error', 'always', { 'omitLastInOneLineBlock': true }],
    // 强制分号前没有空格
    'semi-spacing': ['error', {
      'before': false,
      'after': true,
    }],
    'space-before-blocks': ['error', 'always'],
    // 要求函数圆括号之前有一个空格
    'space-before-function-paren': 'off',
    // 强制在圆括号内使用一致的空格
    'space-in-parens': ['error', 'never'],
    'space-infix-ops': 'error',
    // 一元操作符之前保留空格
    'space-unary-ops': ['error', {
      'words': true,
      'nonwords': false,
    }],
    // 在注释符号与注释内容之间保留空格
    'spaced-comment': ['error', 'always', {
      'markers': ['global', 'globals', 'eslint', 'eslint-disable', '*package', '!', ','],
    }],
    // 禁止模板字符串变量引用时花括号内出现空格
    'template-curly-spacing': ['error', 'never'],
    // 要求使用 isNaN() 检查 NaN
    'use-isnan': 'error',
    // 强制 typeof 表达式与有效的字符串进行比较
    'valid-typeof': 'error',
    // 要求 IIFE(自执行函数) 使用括号括起来
    'wrap-iife': ['error', 'any'],
    // 条件判断中变量应该在字面量前
    'yoda': ['error', 'never'],
    // 要求使用 const 声明那些声明后不再被修改的变量
    'prefer-const': 'error',
    // 禁用 debugger
    'no-debugger': NOT_PROD ? 'off' : 'error',
    // 'no-debugger': 'off',
    // 强制在大括号中使用一致的空格
    'object-curly-spacing': ['error', 'always'],
    // 强制数组方括号中使用一致的空格
    'array-bracket-spacing': ['error', 'never'],

    // ES6 风格配置
    // 强制 getter/setter 成对出现在对象中
    'accessor-pairs': 'error',
    // 要求箭头函数的箭头之前或之后有空格
    'arrow-spacing': 'error',
    // 验证构造函数中 super() 的调用: 派生类中的构造函数必须调用 super()。非派生类的构造函数不能调用 super()
    'constructor-super': 'error',
    // 禁用不必要的构造函数
    'no-useless-constructor': 'error',
    // 禁止在构造函数中，在调用 super() 之前使用 this 或 super
    'no-this-before-super': 'error',
    // 强制 generator 函数中 * 号周围有空格
    'generator-star-spacing': ['error', { 'before': true, 'after': true, }],
    // 强制在 yield* 表达式中 * 周围使用空格
    'yield-star-spacing': ['error', 'both'],
    // 禁止修改类声明的变量
    'no-class-assign': 'error',
    // 不允许改变用const声明的变量
    'no-const-assign': 'error',
    // 禁止使用空解构
    'no-empty-pattern': 'error',
  },
};
