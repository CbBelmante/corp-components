/**
 * 🔐 Validation Rules - Sistema de Validação do CbAdmin
 *
 * Arquivo que exporta validation rules para uso em formulários Vue:
 * - Rules para UX imediato (estilo Vuetify - feedback instantâneo)
 * - Validadores brasileiros reutilizados (CPF, CNPJ, CEP, Telefone)
 * - Integração com vue-i18n para mensagens reativas
 *
 * 📝 CONTEXTO SISTEMA:
 * - Rules retornam true ou mensagem de erro (Vuetify-style)
 * - Validadores puros garantem consistência entre regras
 * - Mensagens i18n em português (pt-BR)
 * - API simples e familiar para desenvolvedores
 *
 * 🔗 DEPENDÊNCIAS:
 * - vue-i18n - Composable useI18n para mensagens reativas
 * - ValidatorUtils - Validadores brasileiros centralizados (CPF, CNPJ - Receita Federal)
 *
 * @example
 * ```typescript
 * // Em componente Vue:
 * import { useValidationRules } from '@/validations/rules'
 *
 * // Rules para validação (feedback instantâneo)
 * const rules = useValidationRules()
 *
 * // Composição de rules:
 * <CustomBetterInput :rules="[rules.required, rules.minLength(3), rules.maxLength(100)]" />
 * ```
 */

// ============== DEPENDÊNCIAS EXTERNAS ==============
import { useI18n } from 'vue-i18n';
import { validateCNPJ, validateCPF, validatePhone } from './ValidatorUtils';

// ============== CONSTANTES DE CONFIGURAÇÃO ==============

/**
 * Regex para validação de CEP brasileiro
 * Formato: 00000-000
 */
const CEP_REGEX = /^\d{5}-\d{3}$/;

/**
 * Regex para validação de email
 * Pattern básico mas eficiente
 */
const EMAIL_REGEX = /.+@.+\..+/;

// ============== TYPES ==============

/**
 * Tipo para funções de validação (rules)
 *
 * Rules retornam true se válido ou string com mensagem de erro.
 * Aceita unknown para máxima flexibilidade e type safety.
 */
export type ValidationRule = (value: unknown) => string | true;

/**
 * Tipo para dados de formulário de Company
 *
 * Define a estrutura esperada para criar/editar empresa
 */
export interface ICompanyFormData {
  /** Nome oficial (razão social) */
  name: string;
  /** Nome fantasia (opcional) */
  trade_name?: string;
  /** CNPJ formatado: 00.000.000/0000-00 */
  document: string;
  /** Email corporativo */
  email: string;
  /** Telefone (opcional): (00) 00000-0000 */
  phone?: string;
  /** Status ativo */
  active: boolean;
}

/**
 * Tipo para dados de login
 */
export interface ILoginFormData {
  /** Email do usuário */
  email: string;
  /** Senha do usuário */
  password: string;
}

// ============== COMPOSABLE - RULES (VALIDAÇÃO) ==============

/**
 * Hook para rules de validação estilo Vuetify
 *
 * Retorna funções que validam e retornam true ou mensagem de erro.
 * Usado em CbInput, CbSelect, etc. para feedback instantâneo durante digitação.
 *
 * @returns Objeto com rules reutilizáveis para validação
 *
 * @example
 * ```typescript
 * const rules = useValidationRules()
 *
 * // Uso em template:
 * <CbInput :rules="[rules.required, rules.cnpj]" />
 *
 * // Composição de rules:
 * <CbInput :rules="[rules.required, rules.minLength(3), rules.maxLength(100)]" />
 *
 * // Rules condicionais:
 * <CbInput :rules="isRequired ? [rules.required, rules.email] : [rules.email]" />
 * ```
 */
export function useValidationRules() {
  const { t } = useI18n();

  return {
    // ========== REGRAS GENÉRICAS ==========

    /**
     * Valida campo obrigatório
     *
     * @param v - Valor para validar
     * @returns True se válido, mensagem de erro se inválido
     */
    required: (v: unknown) => !!v || t('validation.required'),

    /**
     * Valida comprimento mínimo de string
     * SEMPRE reprova se tamanho < min (incluindo vazio que é 0)
     *
     * @param min - Comprimento mínimo requerido
     * @returns Função de validação
     */
    minLength:
      (min: number) =>
      (v: unknown): string | true => {
        const str = String(v ?? '');
        return str.length >= min || t('validation.string.min', { min });
      },

    /**
     * Valida comprimento máximo de string
     *
     * @param max - Comprimento máximo permitido
     * @returns Função de validação
     */
    maxLength:
      (max: number) =>
      (v: unknown): string | true => {
        if (!v) return true;
        const str = String(v);
        return str.length <= max || t('validation.string.max', { max });
      },

    // ========== DOCUMENTOS BRASILEIROS ==========

    /**
     * Valida CNPJ (formato + dígitos verificadores)
     *
     * Aceita formato com ou sem formatação:
     * - Com formatação: 00.000.000/0000-00
     * - Sem formatação: 00000000000000
     * Valida dígitos verificadores usando algoritmo da Receita Federal
     *
     * @param v - CNPJ para validar
     * @returns True se válido, mensagem de erro se inválido
     */
    cnpj: (v: unknown): string | true => {
      if (!v) return true; // Opcional
      const str = String(v);
      // Usa ValidatorUtils que aceita com ou sem formatação
      return validateCNPJ(str) || t('validation.brazil.cnpj.invalid');
    },

    /**
     * Valida CPF (formato + dígitos verificadores)
     *
     * Aceita formato com ou sem formatação:
     * - Com formatação: 000.000.000-00
     * - Sem formatação: 00000000000
     * Valida dígitos verificadores usando algoritmo da Receita Federal
     *
     * @param v - CPF para validar
     * @returns True se válido, mensagem de erro se inválido
     */
    cpf: (v: unknown): string | true => {
      if (!v) return true; // Opcional
      const str = String(v);
      // Usa ValidatorUtils que aceita com ou sem formatação
      return validateCPF(str) || t('validation.brazil.cpf.invalid');
    },

    /**
     * Valida CEP brasileiro
     *
     * Aceita formato: 00000-000
     *
     * @param v - CEP para validar
     * @returns True se válido, mensagem de erro se inválido
     */
    cep: (v: unknown): string | true => {
      if (!v) return true;
      const str = String(v);
      return CEP_REGEX.test(str) || t('validation.brazil.cep.invalidFormat');
    },

    /**
     * Valida telefone brasileiro
     *
     * Aceita formatos com ou sem formatação:
     * - Com formatação: (11) 99999-9999 ou (11) 9999-9999
     * - Sem formatação: 11999999999 ou 1199999999
     *
     * @param v - Telefone para validar
     * @returns True se válido, mensagem de erro se inválido
     */
    phone: (v: unknown): string | true => {
      if (!v) return true;
      const str = String(v);
      return validatePhone(str) || t('validation.brazil.phone.invalid');
    },

    // ========== CAMPOS COMUNS ==========

    /**
     * Valida formato de email
     *
     * @param v - Email para validar
     * @returns True se válido, mensagem de erro se inválido
     */
    email: (v: unknown): string | true => {
      if (!v) return true;
      const str = String(v);
      return EMAIL_REGEX.test(str) || t('validation.string.email');
    },

    /**
     * Valida URL válida
     *
     * Usa API nativa URL para validação robusta
     *
     * @param v - URL para validar
     * @returns True se válido, mensagem de erro se inválido
     */
    url: (v: unknown): string | true => {
      if (!v) return true;
      const str = String(v);
      try {
        new URL(str);
        return true;
      } catch {
        return t('validation.string.url');
      }
    },

    // ========== ARRAYS ==========

    /**
     * Valida tamanho mínimo de array
     *
     * @param min - Quantidade mínima de itens
     * @returns Função de validação
     *
     * @example
     * ```typescript
     * // Pelo menos 1 dia da semana selecionado
     * <WeekDayPicker :rules="[rules.minArrayLength(1)]" />
     * ```
     */
    minArrayLength:
      (min: number) =>
      (v: unknown): string | true => {
        if (!v) return t('validation.array.min', { min });
        if (!Array.isArray(v)) return t('validation.array.min', { min });
        return v.length >= min || t('validation.array.min', { min });
      },

    /**
     * Valida tamanho máximo de array
     *
     * @param max - Quantidade máxima de itens
     * @returns Função de validação
     *
     * @example
     * ```typescript
     * // Máximo 30 alunos por turma
     * <StudentPicker :rules="[rules.maxArrayLength(30)]" />
     * ```
     */
    maxArrayLength:
      (max: number) =>
      (v: unknown): string | true => {
        if (!v) return true;
        if (!Array.isArray(v)) return true;
        return v.length <= max || t('validation.array.max', { max });
      },

    // ========== HORÁRIOS ==========

    /**
     * Valida formato de horário HH:MM
     *
     * Aceita formatos: 00:00 até 23:59
     *
     * @param v - Horário para validar
     * @returns True se válido, mensagem de erro se inválido
     *
     * @example
     * ```typescript
     * <TimeInput :rules="[rules.required, rules.timeFormat]" />
     * ```
     */
    timeFormat: (v: unknown): string | true => {
      if (!v) return true;
      const str = String(v);
      const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
      return timeRegex.test(str) || t('validation.time.invalidFormat');
    },

    /**
     * Valida que horário é DEPOIS de outro horário
     *
     * Útil para validar que endTime > startTime
     *
     * @param otherTime - Horário de referência (string HH:MM)
     * @param otherLabel - Label do campo de referência para mensagem
     * @returns Função de validação
     *
     * @example
     * ```typescript
     * // endTime deve ser depois de startTime
     * <TimeInput
     *   v-model="endTime"
     *   :rules="[rules.required, rules.timeFormat, rules.afterTime(startTime, 'horário inicial')]"
     * />
     * ```
     */
    afterTime:
      (otherTime: string, otherLabel?: string) =>
      (v: unknown): string | true => {
        if (!v || !otherTime) return true;
        const str = String(v);
        const label = otherLabel || t('validation.time.startTime');
        return (
          str > otherTime || t('validation.time.mustBeAfter', { field: label })
        );
      },

    /**
     * Valida que horário é ANTES de outro horário
     *
     * Útil para validar que startTime < endTime
     *
     * @param otherTime - Horário de referência (string HH:MM)
     * @param otherLabel - Label do campo de referência para mensagem
     * @returns Função de validação
     *
     * @example
     * ```typescript
     * // startTime deve ser antes de endTime
     * <TimeInput
     *   v-model="startTime"
     *   :rules="[rules.required, rules.timeFormat, rules.beforeTime(endTime, 'horário final')]"
     * />
     * ```
     */
    beforeTime:
      (otherTime: string, otherLabel?: string) =>
      (v: unknown): string | true => {
        if (!v || !otherTime) return true;
        const str = String(v);
        const label = otherLabel || t('validation.time.endTime');
        return (
          str < otherTime || t('validation.time.mustBeBefore', { field: label })
        );
      },

    /**
     * Valida que horário é IGUAL a outro horário
     *
     * @param otherTime - Horário de referência (string HH:MM)
     * @param otherLabel - Label do campo de referência para mensagem
     * @returns Função de validação
     */
    equalsTime:
      (otherTime: string, otherLabel?: string) =>
      (v: unknown): string | true => {
        if (!v || !otherTime) return true;
        const str = String(v);
        const label = otherLabel || t('validation.time.otherTime');
        return (
          str === otherTime || t('validation.time.mustEqual', { field: label })
        );
      },
  };
}
