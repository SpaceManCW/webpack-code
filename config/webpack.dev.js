const os = require("os"); // nodejs核心模块，专门用来处理操作系统相关问题
const path = require("path"); // nodejs核心模块，专门用来处理路径问题

// 使用插件需要先下载然后再引入  然后在配置中调用
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const threads = os.cpus().length; // cpu核数
module.exports = {
  // 入口
  entry: "./src/main.js", // 相对路径
  // 输出
  output: {
    // 文件的输出路径
    path: undefined, // 开发模式没有输出  不需要指定输出路径
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
        // 每个文件只能被其中一个loader配置处理
        oneOf: [
          {
            test: /\.css$/, // 只检测.css文件
            use: [ // 执行顺序从右到左（从下到上）
              'style-loader', // 将js中的css通过创建style标签添加html文件中生效
              'css-loader', // 将css文件编译成commonjs的模块到js中
            ],
          },
          {
            test: /\.less$/,
            // loader: 'xxx' 只能使用一个loader
            use: [ 
              // 使用多个loader
              'style-loader', 
              'css-loader', 
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
            include: path.resolve(__dirname, "../src"), // 只检测src目录下的js文件
            // exclude: /node_modules/, // 排除node-modules中的js文件不处理
            use: [
              {
                loader: 'thread-loader', // 开启多进程
                options: {
                  works: threads, // 开启多线程打包
                }
              },
              {
                loader: 'babel-loader',
                options: {
                  // presets: ['@babel/preset-env'],
                  cacheDirectory: true, // 开启babel缓存
                  cacheCompression: false, // 关闭babel缓存压缩
                  plugins: ['@babel/plugin-transform-runtime'], // 减少代码体积
                },
              }
            ]
          },
        ]
      }
    ]
  },
  // 插件
  plugins: [
    // plugins的配置
    // new ESLintPlugin({
    //   // 检测哪些文件
    //   context: path.resolve(__dirname, "src"),
    //   exclude: "node_modules",
    //   // 开启Eslint缓存，并指定缓存文件的位置
    //   cache: true,
    //   cacheLocation: path.resolve(__dirname, "../node_modules/.cache/eslintcache"),
    //   threads // 开启多进程
    // }),
    new HtmlWebpackPlugin({
      // 模板 以public/index.html文件创建的新的html文件
      // 新的html文件特点：1、结构和原来一致 2、自动引入打包输出的资源
      // 将打包生成的css和js文件自动注入到生成的html文件
      template: path.resolve(__dirname, "../public/index.html"),
    })
  ],
  // 开发服务器
  // 下载 webpack-dev-server
  // 执行 npx webpack server 启动本地服务器 自动打开浏览器实时编译运行
  // 注意：本地服务器不会输出资源  也就是说无法更新dist中的文件  是在内存中编译打包的
  devServer: {
    host: 'localhost', // 启动服务器域名
    port: '3000', // 启动服务器端口号
    open: true, // 是否自动打开浏览器
    hot: true, // 开启HMR
  },
  // 模式
  mode: "development",
  devtool: "cheap-module-source-map" // 开发模式SourceMap
}