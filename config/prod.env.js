'use strict'
module.exports = {
  NODE_ENV: '"production"'
}
//npm 提供一个npm_lifecycle_event变量，返回当前正在运行的脚本名称，比如pretest、test、posttest等等。所以，可以利用这个变量，在同一个脚本文件里面，为不同的npm scripts命令编写代码。
const target = process.env.npm_lifecycle_event;
let obj;

if (target == 'test') {
  //测试服
  obj = {
    NODE_ENV: '"production"',
    BASE_URL: '"https://192.168.200.246:8023/"'
  }
} else {
  //正式服
  obj = {
    NODE_ENV: '"production"',
    BASE_URL: '"http://partner.iread.wo.com.cn/qypt/"'
  }
}