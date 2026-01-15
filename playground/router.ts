import { createRouter, createWebHistory } from 'vue-router';
import Home from './pages/Home.vue';
import BadgeTest from './pages/BadgeTest.vue';
import BreadcrumbTest from './pages/BreadcrumbTest.vue';
import CardTest from './pages/CardTest.vue';
import ButtonTest from './pages/ButtonTest.vue';
import CheckboxTest from './pages/CheckboxTest.vue';
import InputTest from './pages/InputTest.vue';
import ProgressTest from './pages/ProgressTest.vue';
import RadioGroupTest from './pages/RadioGroupTest.vue';
import SelectTest from './pages/SelectTest.vue';
import SwitchTest from './pages/SwitchTest.vue';
import TextareaTest from './pages/TextareaTest.vue';
import { getPlaygroundRoutes } from './config/components';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    ...getPlaygroundRoutes({
      Badge: BadgeTest,
      Breadcrumb: BreadcrumbTest,
      Button: ButtonTest,
      Card: CardTest,
      Checkbox: CheckboxTest,
      Input: InputTest,
      Progress: ProgressTest,
      RadioGroup: RadioGroupTest,
      Select: SelectTest,
      Switch: SwitchTest,
      Textarea: TextareaTest,
    }),
  ],
});

export default router;
