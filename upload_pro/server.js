const http = require('http');
const url = require('url');

// 路由模块的耦合由依赖注入式方法实现，包括路由导航函数和对应的路由分配对象
function start(router, handle) {
  function onRequest(req, res) {
    let pathname = url.parse(req.url).pathname;
    router(pathname, handle, res, req);
  }
  http.createServer(onRequest).listen(8888);
  console.log('服务器已经启动！');
}
exports.start = start;