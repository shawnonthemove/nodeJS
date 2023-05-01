// 服务器端代码，响应 http 请求并与数据库通信

// 连接数据库
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/articles')

// 创建数据模型
const Article = mongoose.model('Article', new mongoose.Schema({
  title: { type: String },
  content: { type: String },
}))

// Article.db.dropCollection('articles')

// 引入 json 和 cors 中间件来处理请求，因为前端 vue 项目和服务器端不同源，端口号不一致
const express = require('express');
const cors = require('cors')

const app = express();
app.use(cors())
app.use(express.json())

// 获取所有文章
app.get('/api/articles', async (req, res) => {
  const articles = await Article.find()
  res.send(articles);
})

// 创建文章
app.post('/api/articles', async (req, res) => {
  const article = await Article.create({
    title: req.body.title,
    content: req.body.content
  });
  res.send(article);
})

// 删除文章
app.delete('/api/articles/:id', async (req, res) => {
  await Article.findByIdAndDelete(req.params.id);
  res.send({
    status: true
  })
})

// 文章详情
app.get('/api/articles/:id', async (req, res) => {
  const article = await Article.findById(req.params.id);
  res.send(article)
})

// 编辑文章
app.put('/api/articles/:id', async (req, res) => {
  await Article.findByIdAndUpdate(req.params.id, req.body)
  res.send({
    status: true
  })
})

app.listen(3001, () => {
  console.log('http://127.0.0.1:3001/');
})