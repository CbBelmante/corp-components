/**
 * 🔧 useLucideIcon - Sistema de Ícones Lucide Corp Components
 *
 * Import automático dinâmico de ícones Lucide Vue Next.
 * ZERO MANUTENÇÃO: Aceita qualquer ícone do lucide-vue-next automaticamente.
 *
 * 🔗 DEPENDÊNCIAS:
 * - lucide-vue-next
 */

// ============== DEPENDÊNCIAS EXTERNAS ==============
import * as LucideIcons from 'lucide-vue-next'
import { Search } from 'lucide-vue-next'

// ============== HELPER FUNCTIONS ==============

/**
 * Converte string para PascalCase
 */
const toPascalCase = (str: string): string => {
  if (!/[-_\s]/.test(str)) {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  return str
    .split(/[-_\s]/)
    .map(word => {
      if (/^\d+$/.test(word)) return word
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    })
    .join('')
}

// ============== MAIN FUNCTION ==============

/**
 * Retorna componente Lucide por nome dinâmico
 *
 * @example
 * getLucideIcon('User')        // PascalCase
 * getLucideIcon('luc-user')    // Com prefixo
 * getLucideIcon('user-plus')   // kebab-case
 */
export const getLucideIcon = (iconName: string) => {
  const cleanName = iconName.replace(/^luc-/, '')
  const pascalName = toPascalCase(cleanName)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const IconComponent = (LucideIcons as any)[pascalName]

  return IconComponent || Search
}
