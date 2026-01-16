import { createRouter, createWebHistory } from 'vue-router';
import Home from './pages/Home.vue';
import { getPlaygroundRoutes } from './config/autoComponents';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    ...getPlaygroundRoutes(),
  ],
});

export default router;
