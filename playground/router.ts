import { createRouter, createWebHistory } from 'vue-router';
import Home from './pages/Home.vue';
import ButtonTest from './pages/ButtonTest.vue';
import InputTest from './pages/InputTest.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/buttons',
      name: 'buttons',
      component: ButtonTest,
    },
    {
      path: '/inputs',
      name: 'inputs',
      component: InputTest,
    },
  ],
});

export default router;
