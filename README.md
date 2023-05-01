# 这是一个 nodeJS、node-vue2 以及 node-vue3 的练习仓库，同时还包括了学习 node 模块的学习笔记

## notes.md 是学习 node 各模块的学习笔记

## -- demo1 是使用 fs 模块创建可读流和可写流来复制本地图片的 demo

## -- demo2 是使用 http 模块和 fs 模块完成的一个登录验证代码

- 要点一：创建服务对象, req是请求报文对象, 可读流数据, res是响应报文对象, 每次有请求都会出发回调函数
- 要点二：根据 url 以及 reference 记录来判断当前的用户操作，如果注册则更新 whitePersons 名单，如果登录的话就验证请求体携带的内容，之后使用 fs 模块读取本地 html 返回给用户

## -- demo3 是使用 realine 模块来模拟命令行

- 要点：其中的可读流和可写流可以替换为自定义流，这样就可以通过管道拼接进行一些自定义处理

```js
const shell = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})
```

## -- mongo 是使用 mongoose 模块对接 mongoDB 的过程

- 要点：连接本地 mongodb 后可以使用 model 创建表，在 Schema 中定义各个字段，并且设置一些关联规则

```js
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mongo0')
const CategorySchema = new mongoose.Schema({
  name: { type: String }
}, {
  toJSON: { virtuals: true }
})
const Category = mongoose.model('Category', CategorySchema)
```

## -- upload_pro 是使用 nodeJS 实现文件上传的过程，待完善

## -- **vue2-node** --

这里包括三个项目，分别是 vue2 的两个实践项目以及一个 nodeJS 使用 express 模块完成的用户登录、认证以及鉴权的过程

1. changan-使用vue2实现一个二进制传信系统。
2. boss-使用vue2仿写手机端（当前载体是iphone x）的boss网页，包括首页、内容页以及详情页。

>>> 首先是 css 仿写，然后使用 cdnjs 引入 vue2，实现数据与视图分离，引入 tailwindcss 进行样式改造。（vue create app）

3. express-auth-使用 express 模块完成一整套登录认证鉴权流程。

    ### 准备工作 1

    启动 mongoDB，开启后台数据库

    ```
    cd /usr/local/mongodb
    mongod --fork -dbpath data -logpath log/mongo.log --logappend
    ```

    ### 准备工作 2

    使用 express 框架先搭建本地服务器，记录所有路由如下：

    |路由路径|内容|
    |-|-|
    |/api/register|向服务器推送用户注册|
    |/api/login|向服务器推送注册数据并验证是否合法|
    |/api/users|获取当前数据库所有用户|
    |/api/profile|根据token完成鉴权并得到用户ID，从数据库查找用户信息|

    ### 准备工作 3

    使用 REAT Client 插件使用代码发送 HTTP get/post 请求

    ### -*内容要点*

    1. 限定用户名唯一
    在Schema中添加unique:true, 在options中添加useCreateIndex:true
    2. 密码加密
    安装bcrypt, 添加set函数进行hashSync(val, 10);加密
    3. 用户登陆
    如果用户名不存在return res.status(422)
    4. 用户存在
    利用compare.Sync({密码明文，数据库密文})进行解密
    5. 生成token
    使用jsonwebtoken包，jwt.sign({id}, SECRET);
    生成的token加入到请求头Authorization: Bearer token中
    6. 验证token
    jwt.verify(token, SECRET)。可以将此步放置到**中间件**中，通过next()使用于每个接口中。

## -- **vue3-node** --

使用 elementPlus 以及 nodeJS、mongoDB 设计的一个文章管理平台，分为三个部分，分别是前端页面、服务器创建及管理、数据库操作，具体的路由安排如下表：

|路由路径|内容|
|-|-|
|/|重定向到/article/articleList|
|/article/articleList|访问数据库并展示所有文章|
|/article/create|创建新的文章|
|/article/:id/edit|根据动态 id 找到用户，并修改用户信息|