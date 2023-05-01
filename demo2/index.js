const http = require('http');
const fs = require('fs');

const whitePersons = [
  {
    username: 'shawn',
    password: '1234'
  },
  {
    username: 'tiao',
    password: '2223'
  },
]

// 创建服务对象, req是请求报文对象, 可读流数据, res是响应报文对象, 每次有请求都会出发回调函数
const server = http.createServer((req, res) => {
  const method = req.method;
  const url = req.url; // 路径与查询字符串
  const headers = req.headers;
  let body = '';
  let realBody;
  req.on('data', chunk => {
    body += chunk
  });
  
  function parseBody(str) {
    return str.split('&').reduce((pre,item) => {
      let [key, value] = item.split('=');
      pre[key] = value
      return pre
    }, {});
  }

  if (url.startsWith('/reg')) {
    fs.readFile(__dirname + '/reg.html', (err, data) => {
      if (err) {
        console.log('error coming');
        return;
      }
      res.end(data);
    })
  }
  else if (url.startsWith('/data')) {
    req.on('end', () => {
      realBody = parseBody(body);
      //console.log(realBody, whitePersons);
      if (headers.referer == 'http://localhost:9000/reg') {
        whitePersons.push({
          username: realBody['username'],
          password: realBody['password']
        })
        console.log(whitePersons);
        fs.readFile(__dirname + '/login.html', (err, data) => {
            if (err) {
              console.log('error coming');
              return;
            }
            res.write('<h1>reg success !</h1>')
            res.end(data);
        })
      }
      else {
        let obj = whitePersons.map(item => JSON.stringify(item));
        if (obj.includes(JSON.stringify(realBody))) {
          fs.readFile(__dirname + '/home.html', (err, data) => {
            if (err) {
              console.log('error coming');
              return;
            }
            res.end(data);
          })
        }
        else {
          fs.readFile(__dirname + '/login.html', (err, data) => {
            if (err) {
              console.log('error coming');
              return;
            }
            res.write('<h1>usr error or psd error</h1>')
            res.end(data);
          })
        }
      }
    })
  }
  else {
    fs.readFile(__dirname + '/login.html', (err, data) => {
      if (err) {
        console.log('error coming');
        return;
      }
      res.end(data);
    })
  }
});

server.listen(9000, () => {
  console.log('服务启动');
})