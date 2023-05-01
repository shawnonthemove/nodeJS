<template>
  <el-scrollbar>
    <el-table :data="articles" stripe class="table">
      <el-table-column prop="title" label="文章标题" width="180" />
      <el-table-column prop="content" label="文章内容" width="520" />
      <el-table-column fixed="right" label="操作" width="220">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.row, scope.row._id)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.row._id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-scrollbar>
</template>

<script setup>
import { ref, reactive, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const { proxy } = getCurrentInstance()
const articles = ref([])
const fetchData = () => {
  proxy.$axios.get('articles').then(res => articles.value = res.data)
}
// 初始化
fetchData()

const handleEdit = (row, id) => {
  router.push(`${id}/edit`)
}
const handleDelete = (id) => {
  proxy.$axios.delete(`articles/${id}`).then(res => {
    if (res.data.status) {
      ElMessage({
        message: '文章删除成功',
        type: 'success',
      })
      fetchData()
    }
    else {
      ElMessage.error('文章删除失败')
    }
  })

}
</script>

<style scoped>
.table {
  margin: 20px;
}
</style>