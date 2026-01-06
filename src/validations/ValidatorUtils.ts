/**
 * 🛡️ ValidatorUtils - Validadores Brasileiros Centralizados
 *
 * Biblioteca única com TODOS os validadores brasileiros.
 * Implementa algoritmos oficiais da Receita Federal para CPF e CNPJ.
 * Valida telefones brasileiros (fixos e celulares com DDD).
 * Aceita documentos/telefones com ou sem formatação.
 *
 * 📝 CONTEXTO SISTEMA:
 * - Fonte única da verdade para validação brasileira
 * - Usado por stringUtils, rules.ts
 * - Algoritmos oficiais da Receita Federal (CPF/CNPJ)
 * - Validação de telefone com DDD brasileiro (fixo e celular)
 * - Suporta formato formatado e sem formatação
 * - Elimina duplicação de código (princípio DRY)
 *
 * 🔗 DEPENDÊNCIAS:
 * - ✅ ZERO dependências externas!
 * - Funções 100% puras usando apenas APIs nativas
 * - Compatibilidade universal (browser + Node.js)
 *
 * @example
 * ```typescript
 * import { validateCNPJ, validateCPF, validatePhone } from '@/validations/ValidatorUtils'
 *
 * // Documentos - Com formatação
 * validateCNPJ('11.222.333/0001-81') // true
 * validateCPF('123.456.789-09') // true
 *
 * // Documentos - Sem formatação
 * validateCNPJ('11222333000181') // true
 * validateCPF('12345678909') // true
 *
 * // Telefones - Com formatação
 * validatePhone('(11) 99999-9999') // true (celular)
 * validatePhone('(11) 9999-9999')  // true (fixo)
 *
 * // Telefones - Sem formatação
 * validatePhone('11999999999') // true (celular)
 * validatePhone('1199999999')  // true (fixo)
 * ```
 */

// ============== DEPENDÊNCIAS EXTERNAS ==============
// ✅ NENHUMA - Funções puras usando apenas APIs nativas!

// ============== CONSTANTES DE CONFIGURAÇÃO ==============

/**
 * Regex para validação de formato CPF brasileiro
 * Formato: ###.###.###-##
 */
export const CPF_REGEX = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;

/**
 * Regex para validação de formato CNPJ brasileiro
 * Formato: ##.###.###/####-##
 */
export const CNPJ_REGEX = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;

/**
 * Regex para validação de telefone brasileiro
 * Aceita formatos:
 * - (##) #####-#### (celular com 9 dígitos)
 * - (##) ####-#### (fixo com 8 dígitos)
 * - Sem formatação: 11 ou 10 dígitos
 */
export const PHONE_REGEX = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;

/**
 * Tamanho esperado do CPF sem formatação (apenas dígitos)
 */
const CPF_LENGTH = 11;

/**
 * Tamanho esperado do CNPJ sem formatação (apenas dígitos)
 */
const CNPJ_LENGTH = 14;

/**
 * CPFs conhecidos como inválidos (todos dígitos iguais)
 */
const INVALID_CPFS = [
  '00000000000',
  '11111111111',
  '22222222222',
  '33333333333',
  '44444444444',
  '55555555555',
  '66666666666',
  '77777777777',
  '88888888888',
  '99999999999',
];

/**
 * CNPJs conhecidos como inválidos (todos dígitos iguais)
 */
const INVALID_CNPJS = [
  '00000000000000',
  '11111111111111',
  '22222222222222',
  '33333333333333',
  '44444444444444',
  '55555555555555',
  '66666666666666',
  '77777777777777',
  '88888888888888',
  '99999999999999',
];

// ============== FUNÇÕES AUXILIARES (PRIVATE) ==============

/**
 * Remove formatação do CPF mantendo apenas dígitos
 *
 * @param cpf - CPF formatado ou não
 * @returns CPF contendo apenas dígitos numéricos
 */
function cleanCPF(cpf: string): string {
  return cpf.replace(/[^\d]/g, '');
}

/**
 * Remove formatação do CNPJ mantendo apenas dígitos
 *
 * @param cnpj - CNPJ formatado ou não
 * @returns CNPJ contendo apenas dígitos numéricos
 */
function cleanCNPJ(cnpj: string): string {
  return cnpj.replace(/[^\d]/g, '');
}

/**
 * Remove formatação do telefone mantendo apenas dígitos
 *
 * @param phone - Telefone formatado ou não
 * @returns Telefone contendo apenas dígitos numéricos
 */
function cleanPhone(phone: string): string {
  return phone.replace(/\D/g, '');
}

/**
 * Verifica se CPF limpo é um CPF conhecido inválido
 *
 * @param cleanedCPF - CPF contendo apenas dígitos
 * @returns True se CPF está na lista de inválidos
 */
function isKnownInvalidCPF(cleanedCPF: string): boolean {
  return INVALID_CPFS.includes(cleanedCPF);
}

/**
 * Verifica se CNPJ limpo é um CNPJ conhecido inválido
 *
 * @param cleanedCNPJ - CNPJ contendo apenas dígitos
 * @returns True se CNPJ está na lista de inválidos
 */
function isKnownInvalidCNPJ(cleanedCNPJ: string): boolean {
  return INVALID_CNPJS.includes(cleanedCNPJ);
}

/**
 * Calcula dígito verificador do CPF
 *
 * Implementa algoritmo oficial da Receita Federal para cálculo
 * do dígito verificador usando módulo 11.
 *
 * @param cpf - String de dígitos do CPF (primeiros 9 ou 10 dígitos)
 * @param position - Posição do dígito a calcular (1 para primeiro, 2 para segundo)
 * @returns Dígito verificador calculado (0-9)
 */
function calculateCPFVerifierDigit(cpf: string, position: 1 | 2): number {
  let sum = 0;
  const length = position === 1 ? 9 : 10;
  const multiplier = position === 1 ? 10 : 11;

  for (let i = 0; i < length; i++) {
    sum += parseInt(cpf[i]) * (multiplier - i);
  }

  const remainder = sum % 11;
  return remainder < 2 ? 0 : 11 - remainder;
}

/**
 * Calcula dígito verificador do CNPJ
 *
 * Implementa algoritmo oficial da Receita Federal para cálculo
 * do dígito verificador usando módulo 11.
 *
 * @param cnpj - String de dígitos do CNPJ (sem dígitos verificadores)
 * @param weights - Array de pesos para cálculo
 * @returns Dígito verificador calculado (0-9)
 */
function calculateCNPJVerifierDigit(cnpj: string, weights: number[]): number {
  let sum = 0;

  for (let i = 0; i < weights.length; i++) {
    sum += parseInt(cnpj[i]) * weights[i];
  }

  const remainder = sum % 11;
  return remainder < 2 ? 0 : 11 - remainder;
}

// ============== FUNÇÕES PRINCIPAIS (PUBLIC) ==============

/**
 * Valida formato do CPF (apenas regex, sem validar dígitos)
 *
 * Verifica se CPF está no formato correto (###.###.###-##)
 * mas não valida os dígitos verificadores.
 *
 * @param cpf - CPF para validar formato
 * @returns True se formato é válido
 *
 * @example
 * ```typescript
 * isValidCPFFormat('123.456.789-09') // true
 * isValidCPFFormat('12345678909') // false (sem formatação)
 * isValidCPFFormat('123.456.789') // false (incompleto)
 * ```
 */
export function isValidCPFFormat(cpf: string): boolean {
  return CPF_REGEX.test(cpf);
}

/**
 * Valida formato do CNPJ (apenas regex, sem validar dígitos)
 *
 * Verifica se CNPJ está no formato correto (##.###.###/####-##)
 * mas não valida os dígitos verificadores.
 *
 * @param cnpj - CNPJ para validar formato
 * @returns True se formato é válido
 *
 * @example
 * ```typescript
 * isValidCNPJFormat('11.222.333/0001-81') // true
 * isValidCNPJFormat('11222333000181') // false (sem formatação)
 * isValidCNPJFormat('11.222.333/0001') // false (incompleto)
 * ```
 */
export function isValidCNPJFormat(cnpj: string): boolean {
  return CNPJ_REGEX.test(cnpj);
}

/**
 * Valida CPF completo (formato + dígitos verificadores)
 *
 * Executa validação completa do CPF seguindo algoritmo da Receita Federal:
 * 1. Aceita formato com (###.###.###-##) ou sem formatação (11 dígitos)
 * 2. Remove formatação e verifica tamanho (11 dígitos)
 * 3. Rejeita CPFs conhecidos inválidos (todos dígitos iguais)
 * 4. Calcula e valida primeiro dígito verificador
 * 5. Calcula e valida segundo dígito verificador
 *
 * @param cpf - CPF formatado ou sem formatação para validar
 * @returns True se CPF é válido
 * @throws Não lança erros - retorna false para entradas inválidas
 *
 * @example
 * ```typescript
 * // CPFs válidos - formatado
 * validateCPF('123.456.789-09') // true
 * validateCPF('111.444.777-35') // true
 *
 * // CPFs válidos - sem formatação
 * validateCPF('12345678909') // true
 * validateCPF('11144477735') // true
 *
 * // CPFs inválidos
 * validateCPF('000.000.000-00') // false (todos zeros)
 * validateCPF('123.456.789-99') // false (dígitos incorretos)
 * validateCPF('123.456.789') // false (incompleto)
 * validateCPF('') // false (vazio)
 * ```
 */
export function validateCPF(cpf: string): boolean {
  // Permite vazio (compatibilidade com formulários opcionais)
  if (!cpf) {
    return false;
  }

  // Remove máscara mantendo apenas números
  const cleaned = cleanCPF(cpf);

  // Valida tamanho
  if (cleaned.length !== CPF_LENGTH) {
    return false;
  }

  // Elimina CPFs conhecidos inválidos
  if (isKnownInvalidCPF(cleaned)) {
    return false;
  }

  // Calcula e valida primeiro dígito verificador
  const firstDigit = calculateCPFVerifierDigit(cleaned, 1);
  if (parseInt(cleaned[9]) !== firstDigit) {
    return false;
  }

  // Calcula e valida segundo dígito verificador
  const secondDigit = calculateCPFVerifierDigit(cleaned, 2);
  return parseInt(cleaned[10]) === secondDigit;
}

/**
 * Valida CNPJ completo (formato + dígitos verificadores)
 *
 * Executa validação completa do CNPJ seguindo algoritmo da Receita Federal:
 * 1. Aceita formato com (##.###.###/####-##) ou sem formatação (14 dígitos)
 * 2. Remove formatação e verifica tamanho (14 dígitos)
 * 3. Rejeita CNPJs conhecidos inválidos (todos dígitos iguais)
 * 4. Calcula e valida primeiro dígito verificador
 * 5. Calcula e valida segundo dígito verificador
 *
 * @param cnpj - CNPJ formatado ou sem formatação para validar
 * @returns True se CNPJ é válido
 * @throws Não lança erros - retorna false para entradas inválidas
 *
 * @example
 * ```typescript
 * // CNPJs válidos - formatado
 * validateCNPJ('11.222.333/0001-81') // true
 * validateCNPJ('00.000.000/0001-91') // true
 *
 * // CNPJs válidos - sem formatação
 * validateCNPJ('11222333000181') // true
 * validateCNPJ('00000000000191') // true
 *
 * // CNPJs inválidos
 * validateCNPJ('00.000.000/0000-00') // false (todos zeros)
 * validateCNPJ('11.222.333/0001-99') // false (dígitos incorretos)
 * validateCNPJ('11.222.333/0001') // false (incompleto)
 * validateCNPJ('') // false (vazio)
 * ```
 */
export function validateCNPJ(cnpj: string): boolean {
  // Permite vazio (compatibilidade com formulários opcionais)
  if (!cnpj) {
    return false;
  }

  // Remove máscara mantendo apenas números
  const cleaned = cleanCNPJ(cnpj);

  // Valida tamanho
  if (cleaned.length !== CNPJ_LENGTH) {
    return false;
  }

  // Elimina CNPJs conhecidos inválidos
  if (isKnownInvalidCNPJ(cleaned)) {
    return false;
  }

  // Pesos para cálculo do primeiro dígito verificador
  const weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const firstDigit = calculateCNPJVerifierDigit(cleaned, weights1);

  // Valida primeiro dígito
  if (parseInt(cleaned[12]) !== firstDigit) {
    return false;
  }

  // Pesos para cálculo do segundo dígito verificador
  const weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const secondDigit = calculateCNPJVerifierDigit(cleaned, weights2);

  // Valida segundo dígito
  return parseInt(cleaned[13]) === secondDigit;
}

/**
 * Formata CPF limpo para formato padrão brasileiro
 *
 * @param cpf - CPF contendo apenas dígitos (11 caracteres)
 * @returns CPF formatado (###.###.###-##) ou string vazia se inválido
 *
 * @example
 * ```typescript
 * formatCPF('12345678909') // '123.456.789-09'
 * formatCPF('123456789') // '' (tamanho inválido)
 * formatCPF('123.456.789-09') // '123.456.789-09' (já formatado)
 * ```
 */
export function formatCPF(cpf: string): string {
  const cleaned = cleanCPF(cpf);

  if (cleaned.length !== CPF_LENGTH) {
    return '';
  }

  return cleaned.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
}

/**
 * Formata CNPJ limpo para formato padrão brasileiro
 *
 * @param cnpj - CNPJ contendo apenas dígitos (14 caracteres)
 * @returns CNPJ formatado (##.###.###/####-##) ou string vazia se inválido
 *
 * @example
 * ```typescript
 * formatCNPJ('11222333000181') // '11.222.333/0001-81'
 * formatCNPJ('1122233300018') // '' (tamanho inválido)
 * formatCNPJ('11.222.333/0001-81') // '11.222.333/0001-81' (já formatado)
 * ```
 */
export function formatCNPJ(cnpj: string): string {
  const cleaned = cleanCNPJ(cnpj);

  if (cleaned.length !== CNPJ_LENGTH) {
    return '';
  }

  return cleaned.replace(
    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
    '$1.$2.$3/$4-$5'
  );
}

/**
 * Valida telefone brasileiro completo (com ou sem formatação)
 *
 * Aceita formatos brasileiros:
 * - Com formatação: (11) 99999-9999 ou (11) 9999-9999
 * - Sem formatação: 11999999999 ou 1199999999
 * - Com/sem DDD entre parênteses
 * - Com/sem espaço após DDD
 * - Com/sem hífen no número
 *
 * @param phone - Telefone para validar
 * @returns True se telefone é válido
 *
 * @example
 * ```typescript
 * // Com formatação
 * validatePhone('(11) 99999-9999') // true (celular)
 * validatePhone('(11) 9999-9999')  // true (fixo)
 *
 * // Sem formatação
 * validatePhone('11999999999') // true (celular)
 * validatePhone('1199999999')  // true (fixo)
 *
 * // Inválidos
 * validatePhone('11 9999')     // false (incompleto)
 * validatePhone('999999999')   // false (sem DDD)
 * ```
 */
export function validatePhone(phone: string): boolean {
  if (!phone) return true; // Permite vazio

  // Remove formatação
  const cleaned = cleanPhone(phone);

  // Valida tamanho (10 dígitos = fixo, 11 dígitos = celular)
  if (cleaned.length !== 10 && cleaned.length !== 11) {
    return false;
  }

  // Valida se começa com DDD válido (11-99)
  const ddd = parseInt(cleaned.substring(0, 2));
  if (ddd < 11 || ddd > 99) {
    return false;
  }

  // Se tem 11 dígitos, terceiro deve ser 9 (celular)
  if (cleaned.length === 11 && cleaned[2] !== '9') {
    return false;
  }

  return true;
}

// ============== EMAIL ==============

/**
 * 📧 Regex para validação de email (RFC 5322 simplificado)
 */
export const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

/**
 * 📧 Valida formato de email
 *
 * Validação usando regex RFC 5322 simplificado.
 *
 * @param email - Email para validar
 * @returns True se email válido
 *
 * @example
 * ```typescript
 * validateEmail('user@example.com') // true
 * validateEmail('invalid') // false
 * ```
 */
export function validateEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false;
  if (email.length > 255) return false;
  return EMAIL_REGEX.test(email.trim());
}

// ============== SENHA ==============

/**
 * 🔐 Constantes de validação de senha
 */
export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_MAX_LENGTH = 128;
export const PASSWORD_STRONG_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

/**
 * 🔐 Valida força de senha
 *
 * Requisitos:
 * - Mínimo 8 caracteres
 * - 1 letra maiúscula
 * - 1 letra minúscula
 * - 1 número
 *
 * @param password - Senha para validar
 * @returns Objeto com status e erros
 *
 * @example
 * ```typescript
 * const result = validatePassword('Senha123')
 * if (!result.valid) console.log(result.errors)
 * ```
 */
export function validatePassword(password: string): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!password || typeof password !== 'string') {
    errors.push('Senha é obrigatória');
    return { valid: false, errors };
  }

  if (password.length < PASSWORD_MIN_LENGTH) {
    errors.push(`Senha deve ter no mínimo ${PASSWORD_MIN_LENGTH} caracteres`);
  }

  if (password.length > PASSWORD_MAX_LENGTH) {
    errors.push(`Senha deve ter no máximo ${PASSWORD_MAX_LENGTH} caracteres`);
  }

  if (!/[a-z]/.test(password)) {
    errors.push('Senha deve ter pelo menos 1 letra minúscula');
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('Senha deve ter pelo menos 1 letra maiúscula');
  }

  if (!/\d/.test(password)) {
    errors.push('Senha deve ter pelo menos 1 número');
  }

  return { valid: errors.length === 0, errors };
}

// ============== NOME ==============

/**
 * 📝 Constantes de validação de nome
 */
export const NAME_MIN_LENGTH = 2;
export const NAME_MAX_LENGTH = 100;
export const NAME_REGEX = /^[a-zA-ZÀ-ÿ\s'-]+$/;

/**
 * 👤 Formata nome (capitalização)
 *
 * Remove espaços extras, capitaliza primeira letra.
 * Preserva palavras pequenas (de, da, do, etc) em lowercase.
 *
 * @param name - Nome para formatar
 * @returns Nome formatado
 *
 * @example
 * ```typescript
 * formatName('  joão  silva  ') // "João Silva"
 * formatName('MARIA DE SOUZA') // "Maria de Souza"
 * ```
 */
export function formatName(name: string): string {
  if (!name || typeof name !== 'string') return '';

  return name
    .trim()
    .split(/\s+/)
    .map(word => {
      if (['de', 'da', 'do', 'dos', 'das', 'e'].includes(word.toLowerCase())) {
        return word.toLowerCase();
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ');
}

// ============== EXPORTS ==============

/**
 * Exportações nomeadas para máxima flexibilidade
 */
export default {
  // Validação completa
  validateCPF,
  validateCNPJ,
  validatePhone,
  validateEmail,
  validatePassword,

  // Validação apenas formato
  isValidCPFFormat,
  isValidCNPJFormat,

  // Formatação
  formatCPF,
  formatCNPJ,
  formatName,

  // Constantes úteis
  CPF_REGEX,
  CNPJ_REGEX,
  PHONE_REGEX,
  EMAIL_REGEX,
  PASSWORD_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
  PASSWORD_STRONG_REGEX,
  NAME_MIN_LENGTH,
  NAME_MAX_LENGTH,
  NAME_REGEX,
};
