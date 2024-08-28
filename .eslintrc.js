module.exports = {
  // 继承 Eslint 规则
  extends: ['eslint:recommended'],
  env: {
    node: true, // 启用node中全局变量
    browser: true, // 启用浏览器中全局变量
  },
  parserOptions: {
    ecamVersion: 6, // es6版本
    sourceType: 'module', // 允许使用模块化 es module
  },
  rules: {
    'no-var': 2, // 不能使用var定义变量
  }
}