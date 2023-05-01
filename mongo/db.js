const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mongo0')

const CategorySchema = new mongoose.Schema({
  name: { type: String }
}, {
  toJSON: { virtuals: true }
})
CategorySchema.virtual('posts', {
  localField: '_id',
  ref: 'Post',
  foreignField: 'categories',
  justOne: false,
})

const Category = mongoose.model('Category', CategorySchema)

const Post = mongoose.model('Post', new mongoose.Schema({
  title: { type: String },
  content: { type: String },
  category: { type: mongoose.SchemaTypes.ObjectId, ref: 'Category' },
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }]
}))

async function main() {
  // 添加数据
  // await Post.insertMany([
  //   { title: '我的第一篇帖子', content: '内容1' },
  //   { title: '我的第二篇帖子', content: '内容2' }
  // ])
  // await Category.insertMany([
  //   { name: 'nodeJS' },
  //   { name: 'react' }
  // ])
  // 根据条件查找已有的category和post，然后设置其中的属性，实现关联
  // const cat1 = await Category.findOne({ name: 'nodeJS' });
  // const cat2 = await Category.findOne({ name: 'react' });
  // const post1 = await Post.findOne({ content: '内容1' });
  // const post2 = await Post.findOne({ content: '内容2' });
  // post1.categories = [cat1._id, cat2._id];
  // post2.categories = [cat2._id];
  // await post1.save();
  // await post2.save();
  // const posts = await Post.find().populate('categories')
  // console.log(posts[0]);
  // 反向关联，根据category查找出所有符合的post，virtual关联
  const cats = await Category.find().populate('posts');
  console.log(JSON.stringify(cats));
}
main()