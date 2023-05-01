<template>
  <el-form @submit.prevent="saveArticle" :model="article" label-width="80px" class="form-style">
    <el-form-item label="文章标题">
      <el-input v-model="article.title" placeholder="Please input title of article" clearable />
    </el-form-item>
    <el-form-item label="文章内容">
      <el-input v-model="article.content" type="textarea" rows="5" placeholder="Please input content of article" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" native-type="submit">立即创建</el-button>
      <el-button @click="back">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { getCurrentInstance, reactive } from 'vue'
import { useRouter } from 'vue-router'
const { proxy } = getCurrentInstance()
const router = useRouter()

const article = reactive({
  title: '',
  content: ''
})

const saveArticle = () => {
  proxy.$axios.post('articles', article)//.then(res => console.log(res.data))
  ElMessage({
    message: '文章创建成功',
    type: 'success',
  })
  article.title = ''
  article.content = ''
  router.push('articleList')
}
const back = () => {
  router.go(-1)
}
</script>

<style scoped>
.form-style {
  padding: 20px;
}
</style>
