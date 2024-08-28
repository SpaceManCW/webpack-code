# 处理JS资源

1. webpack对JS的处理是有限的，只能编译js中的ES模块语法，ES6的无法处理，导致js不能在IE等浏览器中运行。针对js的兼容性，我们使用Babel处理
2. 针对代码的格式问题，使用eslint处理

## EsLint

可组装的JS和JSX检查工具

使用EsLint关键是写配置文件。里面写上各种rules规则，运行EsLint时就会以写的规则对代码进行检查

## Babel

Js编译器，主要用于把ES6编写的代码转换为向后兼容的Js版本，以便能够运行在当前和旧版本的浏览器或其他环境中

使用Babel需要添加一个babel的配置文件，并在配置文件中添加babel预设，预设简单理解就是Babel的插件，扩展Babel的功能
