import count from './js/count'
import sum from './js/sum'
import './css/index.css'
import './less/index.less'
import './css/iconfont.css'

var a = 1;
console.log(a);
console.log(count(6,6));
console.log(sum(1,2,3,4));

// js模块实现热模块替换需要如下进行处理
// if(module.hot) {
//   // 判断是否支持热模块替换功能
//   module.hot.accept("./js/count")
// }