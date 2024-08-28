const path = require("path"); // nodejs核心模块，专门用来处理路径问题

// 使用插件需要先下载然后再引入  然后在配置中调用
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  // 入口
  entry: "./src/main.js", // 相对路径
  // 输出
  output: {
    // 文件的输出路径
    // __dirname nodejs变量  代表当前文件的文件夹目录
    path: path.resolve(__dirname, "../dist"), // 绝对路径
    // 文件名
    filename: "static/js/main.js",
    // 自动清空上一次的打包内容
    // 原理：在打包前，将path整个目录内容清空，再进行打包
    clean: true,
  },
  // 加载器
  module: {
    rules: [
      // loader的配置
      {
        test: /\.css$/, // 只检测.css文件
        use: [ // 执行顺序从右到左（从下到上）
          // 'style-loader', // 将js中的css通过创建style标签添加html文件中生效 容易闪屏
          MiniCssExtractPlugin.loader, // 提取css成单独文件
          'css-loader', // 将css文件编译成commonjs的模块到js中
          // 对象的形式定义loader 可以为其添加options配置项
          {
            loader: 'postcss-loader', 
            options: {
              postcssOptions: {
                plugins: [
                  'postcss-preset-env', // 能解决大多数样式兼容性问题
                ]
              }
            }
          }
        ],
      },
      {
        test: /\.less$/,
        // loader: 'xxx' 只能使用一个loader
        use: [ 
          // 使用多个loader
          // 'style-loader', 
          MiniCssExtractPlugin.loader,
          'css-loader', 
          {
            loader: 'postcss-loader', 
            options: {
              postcssOptions: {
                plugins: [
                  'postcss-preset-env', // 能解决大多数样式兼容性问题
                ]
              }
            }
          },
          'less-loader', // 将less文件编译成css文件
        ], 
      },
      {
        test: /\.(png|jpe?g|gif|webp|svg)$/,
        type: 'asset', // 根据文件大小选择内联或者单独打包
        parser: {
          dataUrlCondition: {
            // 小于10kb的图片转base64
            // 减少请求数量 但是体积会变大
            maxSize: 10 * 1024 // 10kb
          }
        },
        generator: {
          // 输出图片名称
          // [hash:10] hash值取前十位
          filename: 'static/images/[hash:10][ext][query]'
        }
      },
      {
        test: /\.(ttf|woff2?|map3|map4|avi)$/,
        type: 'asset/resource', // 始终将文件单独打包
        generator: {
          filename: 'static/media/[hash:10][ext][query]'
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/, // 排除node-modules中的js文件不处理
        loader: 'babel-loader',
        // options: {
        //   presets: ['@babel/preset-env'],
        // },
      },
    ]
  },
  // 插件
  plugins: [
    // plugins的配置
    // new ESLintPlugin({
    //   // 检测哪些文件
    //   context: path.resolve(__dirname, "../src"),
    // })
    new HtmlWebpackPlugin({
      // 模板 以public/index.html文件创建的新的html文件
      // 新的html文件特点：1、结构和原来一致 2、自动引入打包输出的资源
      // 将打包生成的css和js文件自动注入到生成的html文件
      template: path.resolve(__dirname, "../public/index.html"),
    }),
    new MiniCssExtractPlugin({
      filename: 'static/css/main.css'
    })
  ],
  // 模式
  mode: "production"
}