// 缓存雪崩问题：在热点数据上有一层缓存，当缓存失效的时候大量查询请求涌入数据库，导致服务器压力过大。
// 考虑结合once方法进行解决，对于同一个文件的查询请求仅保存一个。

const events = require('events');
const emitter = new events.EventEmitter();
const fs = require('fs');
const status = {};

const select = function (file, filename, cb) {
  emitter.once(file, cb);
  if (status[file] === undefined) {
    status[file] = 'pending';
    fs.readFile(file, function (err, res) {
      console.log(filename);
      emitter.emit(file, err, res.toString()); //触发所有事件进行广播，保证在读取文件完成前所有的事件回调函数得到响应，但是在文件读取完成后绑定的回调会继续等待执行。
      delete status[file];
    })
  }
}

for (let i = 0; i < 10; i++) {
  if (i % 2 === 0) {
    select('./tmp/a.txt', 'a', function(err, res) {
      console.log('err:'+err+'res:'+res);
    })
  }
  else {
    select('./tmp/b.txt', 'b', function(err, res) {
      console.log('err:'+err+'res:'+res);
    })
  }
}