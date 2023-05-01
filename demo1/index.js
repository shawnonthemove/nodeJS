const fs = require('fs');

const ws = fs.createReadStream('../pics/one.jpeg');
const rs = fs.createWriteStream('../pics/one-copy.jpeg');

ws.on('data', chunk => {
  rs.write(chunk)
})

ws.on('end', () => {
  console.log('read over.');
})