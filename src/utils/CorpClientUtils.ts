/**
 * 🎯 CorpClientUtils - Utilitários SSR-safe de ambiente
 *
 * Verificações client vs server, APIs do navegador, execução condicional.
 *
 * 🔗 DEPENDÊNCIAS:
 * - ✅ ZERO (funções puras)
 */

// ============== DEPENDÊNCIAS EXTERNAS ==============

// ✅ NENHUMA - Funções puras usando apenas APIs nativas!

// ============== PURE FUNCTIONS - ENVIRONMENT DETECTION ==============

/**
 * 🎯 Verifica se código executa no client-side (SSR-safe)
 *
 * @returns True se executando no cliente, false no servidor
 */
export function isClientSide(): boolean {
  return typeof window !== 'undefined';
}

/**
 * 🖥️ Verifica se código executa no server-side
 *
 * @returns True se executando no servidor, false no cliente
 */
export function isServerSide(): boolean {
  return typeof window === 'undefined';
}

/**
 * 🌐 Verifica se APIs do navegador (window + document) estão disponíveis
 *
 * @returns True se window/document estão disponíveis
 */
export function isBrowserAvailable(): boolean {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}

// ============== PURE FUNCTIONS - CONDITIONAL EXECUTION ==============

/**
 * 🔄 Executa função apenas no client-side com fallback SSR-safe
 *
 * @param fn - Função a executar no cliente
 * @param fallback - Valor/função de fallback para servidor
 * @returns Resultado da função ou fallback
 */
export function clientOnly<T>(
  fn: () => T,
  fallback?: T | (() => T)
): T | undefined {
  if (isClientSide()) {
    return fn();
  }

  if (fallback !== undefined) {
    return typeof fallback === 'function' ? (fallback as () => T)() : fallback;
  }

  return undefined;
}

/**
 * ⭐ Hook para uso seguro de composables client-side (Vue/Nuxt)
 *
 * @param useComposable - Função do composable a executar
 * @returns Resultado do composable ou null
 */
export function useClientSafe<T>(useComposable: () => T): T | null {
  return clientOnly(useComposable, null) as T | null;
}

/**
 * 🔍 Verifica se API específica do navegador está disponível
 *
 * @param apiName - Nome da API a verificar (ex: 'localStorage')
 * @returns True se a API está disponível
 */
export function isAPIBrowserAvailable(apiName: string): boolean {
  return (
    clientOnly(() => {
      return apiName in window;
    }, false) || false
  );
}

/**
 * 📱 Verifica se Web Share API (navigator.share) está disponível
 *
 * @returns True se navigator.share está disponível
 */
export function isWebShareAvailable(): boolean {
  return (
    clientOnly(() => {
      return (
        typeof navigator !== 'undefined' &&
        'share' in navigator &&
        typeof navigator.share === 'function'
      );
    }, false) || false
  );
}
