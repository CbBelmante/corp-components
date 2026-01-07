import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { i18n } from '@locales';
import { useTheme } from '@/composables/useTheme';
import '@assets/main.css';

// Inicializar tema
const { initTheme } = useTheme();
initTheme();

createApp(App).use(router).use(i18n).mount('#app');
