
function route(pathname, handle, res, req) {
  console.log('路由接收来自url:'+pathname+'的请求');
  console.log(pathname);
  if (typeof handle[pathname] === 'function') {
    handle[pathname](res, req);
  }
  else {
    console.log('对于'+pathname+'没有找到相应的处理程序！')
    res.writeHead(404, {"Content-Type": "text/plain"});
    res.write("页面消失404！");
    res.end();
  }
}
exports.route = route;