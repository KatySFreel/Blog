import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/view/HomePage.vue'
import DesignPage from '@/view/DesignPage.vue'
import ItPage from '@/view/ItPage.vue'
import ManagementPage from '@/view/ManagementPage.vue'
import BlogPost from '@/components/Blog/BlogPost.vue'

const routes = [
  { path: '/', component: HomePage },
  { path: '/design', component: DesignPage },
  { path: '/it', component: ItPage },
  { path: '/management', component: ManagementPage },
  { path: '/post/:id', component: BlogPost }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
