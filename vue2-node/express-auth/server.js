const express = require('express')
const { User } = require('./models')
const jwt = require('jsonwebtoken')
const SECRET = 'shakbizukabjsibdac'

app = express();
app.use(express.json()) // express 中间件：处理 req 的 json 格式

app.get('/api/users', async (req, res) => {
  const users = await User.find()
  res.send(users)
})

app.post('/api/register', async (req, res) => {
  const user = await User.create({
    username: req.body.username,
    password: req.body.password,
  })
  res.send(user)
})

app.post('/api/login', async (req, res) => {
  const user = await User.findOne({
    username: req.body.username
  })
  if (!user) {
    return res.status(422).send({
      message: "用户名不存在"
    })
  }
  const isPwdValid = require('bcrypt').compareSync(
    req.body.password,
    user.password)

  if (!isPwdValid) {
    return res.status(422).send({
      message: "密码错误"
    })
  }
  // 生成 token
  const token = jwt.sign({
    id: String(user._id)
  }, SECRET);
  res.send({
    user,
    token
  })
})

// express 自定义中间件，完成 token 认证
const auth = async (req, res, next) => {
  const token = String(req.headers.authorization).split(' ').pop();
  const { id } = jwt.verify(token, SECRET);
  req.user = await User.findById(id);
  next();
}

app.get('/api/profile', auth, async (req, res) => {
  res.send(req.user)
})

app.listen(3001, () => {
  console.log('http://127.0.0.0.1:3001');
})