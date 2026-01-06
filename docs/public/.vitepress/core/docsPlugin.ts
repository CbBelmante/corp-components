/**
 * 📚 docsPlugin - Helper para Injetar Contexto em GlobalProperties
 *
 * Permite que DocsLayout.vue (que TEM acesso a composables via setup)
 * injete estados reativos em app.config.globalProperties para uso
 * direto nos .md (sem script setup, sem inject).
 *
 * Por que precisamos disso:
 * - DocsLayout tem setup() real: pode usar useForm(), useValidationRules()
 * - Mas globalProperties só é acessível via app (não disponível em setup)
 * - Solução: getCurrentInstance() pega o app do contexto Vue
 */

import { getCurrentInstance, isRef } from 'vue';

/**
 * Injeta contexto (estados, handlers) em app.config.globalProperties
 * Chamado pelo DocsLayout.vue após criar estados reativos
 *
 * Para refs, cria getters que retornam .value automaticamente (mantém reatividade)
 * Para funções e outros valores, injeta diretamente
 *
 * @param context - Objeto com estados e funções a serem globalizados
 */
export function injectDocsContext(context: Record<string, any>) {
  const instance = getCurrentInstance();

  if (!instance) {
    console.warn('⚠️ injectDocsContext: getCurrentInstance() retornou null');
    return;
  }

  const app = instance.appContext.app;

  // Injeta cada propriedade em globalProperties
  Object.keys(context).forEach(key => {
    const value = context[key];

    // Se for Ref, criar getter que retorna .value (mantém reatividade!)
    if (isRef(value)) {
      Object.defineProperty(app.config.globalProperties, key, {
        get: () => value.value,
        enumerable: true,
        configurable: true,
      });
    } else {
      // Funções e outros valores: injetar diretamente
      app.config.globalProperties[key] = value;
    }
  });

  console.log(
    '✅ Contexto de docs injetado em globalProperties:',
    Object.keys(context)
  );
}
