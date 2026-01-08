import { createRouter, createWebHistory } from 'vue-router';
import Home from './pages/Home.vue';
import ButtonTest from './pages/ButtonTest.vue';
import InputTest from './pages/InputTest.vue';
import SelectTest from './pages/SelectTest.vue';
import SwitchTest from './pages/SwitchTest.vue';
import CheckboxTest from './pages/CheckboxTest.vue';

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
    {
      path: '/selects',
      name: 'selects',
      component: SelectTest,
    },
    {
      path: '/switches',
      name: 'switches',
      component: SwitchTest,
    },
    {
      path: '/checkboxes',
      name: 'checkboxes',
      component: CheckboxTest,
    },
  ],
});

export default router;
