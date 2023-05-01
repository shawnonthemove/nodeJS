const exec = require('child_process').exec;
const querystring = require('querystring');
const fs = require('fs');
const formidable = require('formidable');

function start(res, req) {
  console.log('处理start请求');
  const body = '<html>'+
		'<head>'+
		'<meta http-equiv="Content-Type" content="text/html:'+
		'charset=UTF-8" />'+
		'</head>'+
		'<body>'+
		'<form action="/upload" method="post" enctype="multipart/form-data">'+
    '<input type="file" name="upload" multiple="multiple">'+
		'<input type="submit" value="提交" />'+
		'</form>'+
		'</body>'+
		'</html>';
  res.writeHead(200, {"Content-Type": "text/html"});
  res.write(body);
  res.end();
}

function upload(res, req) {
  console.log('处理upload请求');
  res.setHeader('Content-Type', 'text/javascript;charset=UTF-8');
  const form = new formidable.IncomingForm();
  //form.uploadDir = 'tmp';
  form.parse(req, function(err, fields, files) {
    console.log("解析完成");
    console.log(files);
    fs.renameSync(files.upload.filepath, "../tmp/test.png");
    res.writeHead(200, {"Content-Type": "text/html"});
    res.write('接收得到图像：');
    res.write("<img src='./show'>");
    res.end();
  });
}

function show(res, postChunk) {
  console.log('处理show请求');
  fs.readFile('../tmp/test.png', 'binary', function (err, file) {
    if (err) {
      res.writeHead(500, {"Content-Type": "text/plain"});
      res.write(err+"\n");
      res.end();
    }
    else {
      res.writeHead(200, {"Content-Type": "image/png"});
      res.write(file, "binary");
      res.end();
    }
  })
} 

exports.start = start;
exports.upload = upload;
exports.show = show;