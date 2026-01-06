import { createI18n } from 'vue-i18n';
import ptBR from './pt-BR';

/**
 * Configuração do vue-i18n
 * @description Setup simples e funcional para i18n
 */
export const i18n = createI18n({
  legacy: false, // Composition API mode
  locale: 'pt-BR',
  fallbackLocale: 'pt-BR',
  messages: {
    'pt-BR': ptBR,
  },
});
