const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/express-auth')

const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: {
    type: String, set(val) {
      return require('bcrypt').hashSync(val, 10)
    }
  }
})

const User = mongoose.model('User', UserSchema)
// User.db.dropCollection('users') // 可以直接删除对应的 collection，由 find 创造
module.exports = { User }