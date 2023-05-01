# express-auth 使用 nodeJS 设计用户登录鉴权完整过程

## 准备工作 1

启动 mongoDB，开启后台数据库

```
cd /usr/local/mongodb
mongod --fork -dbpath data -logpath log/mongo.log --logappend
```

## 准备工作 2

使用 express 框架先搭建本地服务器，记录所有路由如下：

|路由路径|内容|
|-|-|
|/api/register|向服务器推送用户注册|
|/api/login|向服务器推送注册数据并验证是否合法|
|/api/users|获取当前数据库所有用户|
|/api/profile|根据token完成鉴权并得到用户ID，从数据库查找用户信息|

## 准备工作 3

使用 REAT Client 插件使用代码发送 HTTP get/post 请求

## -*内容要点*

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
