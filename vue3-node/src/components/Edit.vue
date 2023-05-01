<template>
  <el-form @submit.prevent="saveArticle" :model="article" label-width="80px" class="form-style">
    <el-form-item label="文章标题">
      <el-input v-model="article.title" placeholder="Please input title of article" clearable />
    </el-form-item>
    <el-form-item label="文章内容">
      <el-input v-model="article.content" type="textarea" rows="5" placeholder="Please input content of article" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" native-type="submit">保存</el-button>
      <el-button @click="back">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { getCurrentInstance, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const { proxy } = getCurrentInstance()
const router = useRouter()
const route = useRoute()

const article = reactive({
  title: '',
  content: ''
})

// 初始化，注意前端取id需要从router对象中取
proxy.$axios.get(`articles/${route.params.id}`).then(res => {
  article.title = res.data.title
  article.content = res.data.content
})

const saveArticle = () => {
  proxy.$axios.put(`articles/${route.params.id}`, article).then(res => {
    if (res.data.status) {
      ElMessage({
        message: '文章修改成功',
        type: 'success',
      })
      router.push('/article/articleList')
    }
    else {
      ElMessage.error('文章修改失败')
    }
  })
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
