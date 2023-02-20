/*
@ 主进程处理以下逻辑：
@ 1.创建server并监听3000端口；
@ 2.根据系统cpus开启多个子进程；
@ 3.通过子进程对象的send方法发送消息到子进程进行通信；
@ 4.在主进程中监听了子进程的变化，如果是自杀信号重新启动一个工作进程；
@ 5.主进程在监听到退出消息时先退出子进程再退出主进程。
*/

const fork = require('child_process').fork;
const cpus = require('os').cpus;
const server = require('net').createServer();
server.listen(3000);
process.title = 'node-master';

for (let i = 0; i < cpus.length; i++) {
  createWorker();
}

const workers = {};
function createWorker() {
  const worker = fork('./worker.js');
  worker.on('message', (msg) => {
    if (msg.act === 'suicide') createWorker();
  });
  worker.on('exit', (code, signal) => {
    console.log('worker exited with code: %s signal: %s', code, signal);
    delete workers[worker.pid];
  })
  worker.send('server', server); // ?
  workers[worker.pid] = worker;
  console.log('worker process created, pid: %s ppid: %s', worker.pid, process.pid);
}

// 主进程退出前需要先退出子进程
process.once('SIGINT', close.bind(this, 'SIGINT')); // kill(2) Ctrl-C
process.once('SIGQUIT', close.bind(this, 'SIGQUIT')); // kill(3) Ctrl-\
process.once('SIGTERM', close.bind(this, 'SIGTERM')); // kill(15) default
process.once('exit', close.bind(this));

function close (code) {
    console.log('进程退出！', code);

    if (code !== 0) {
        for (let pid in workers) {
            console.log('master process exited, kill worker pid: ', pid);
            workers[pid].kill('SIGINT');
        }
    }

    process.exit(0);
}

// work.js
const http = require('http');
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('I am worker, pid: ' + process.pid + ', ppid: ' + process.ppid);
  throw new Error('worker process exception!'); // 测试异常进程退出、重建
})

let worker;
process.title = 'node-worker';
process.on('message', (msg, sendHandle) => {
  if (msg === 'server') {
    worker = sendHandle;
    worker.on('connection', (socket) => {
      server.emit('connection', socket);
    });
  }
});
process.on('uncaughtException', (err) => {
  console.log(err);
  process.send({act: 'suicide'});
  worker.close(() => process.exit(1));
});