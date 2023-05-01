import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/article/articleList'
    },
    {
      path: '/article/articleList',
      component: () => import('../components/ArrayList.vue')
    },
    {
      path: '/article/create',
      component: () => import('../components/Create.vue')
    },
    {
      path: '/article/:id/edit',
      component: () => import('../components/Edit.vue')
    }
  ]
})

export default router