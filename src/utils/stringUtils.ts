/**
 * 🛠️ stringUtils - Formatação e validação de strings BR
 *
 * Documentos (CPF/CNPJ), telefones, CEP, máscaras, busca difusa (Levenshtein).
 */

// ============== IMPORTAÇÕES ==============
import {
  validateCNPJ,
  validateCPF,
  validatePhone,
} from '@/validations/ValidatorUtils';

// ============== FUNÇÕES DE LIMPEZA ==============

/**
 * 🧹 Remove caracteres não numéricos de string
 *
 * @param value - String para limpar
 * @returns String apenas com números
 */
export const cleanNumeric = (value: string): string => {
  return value.replace(/\D/g, '');
};

/**
 * 🧹 Remove caracteres especiais mantendo letras, números e espaços
 *
 * @param value - String para limpar
 * @returns String alfanumérica limpa
 */
export const cleanAlphanumeric = (value: string): string => {
  return value.replace(/[^a-zA-Z0-9À-ÿ\s]/g, '');
};

/**
 * 🧹 Limpa documento removendo pontos, barras e traços
 *
 * @param document - Documento para limpar
 * @returns Apenas números do documento
 */
export const cleanDocument = (document: string): string => {
  return cleanNumeric(document);
};

/**
 * 🧹 Limpa telefone removendo parênteses, espaços e traços
 *
 * @param phone - Telefone para limpar
 * @returns Apenas números do telefone
 */
export const cleanPhone = (phone: string): string => {
  return cleanNumeric(phone);
};

/**
 * 🧹 Limpa CEP removendo traço
 *
 * @param cep - CEP para limpar
 * @returns Apenas números do CEP
 */
export const cleanCEP = (cep: string): string => {
  return cleanNumeric(cep);
};

// ============== FUNÇÕES DE FORMATAÇÃO ==============

/**
 * 📱 Formata telefone brasileiro com código de área
 *
 * @param phone - Telefone para formatar
 * @returns Telefone formatado (ex: "(11) 99999-9999")
 */
export const formatPhone = (phone: string): string => {
  const cleaned = cleanPhone(phone);

  if (cleaned.length < 10 || cleaned.length > 13) {
    return cleaned;
  }

  const phonePattern = /^(\d{0,2})(\d{2})(\d{4,5})(\d{4})$/;

  return cleaned.replace(
    phonePattern,
    (_match, countryCode, ddd, firstPart, secondPart) => {
      let formattedPhone = '';

      if (countryCode && countryCode.length > 0) {
        formattedPhone += `+${countryCode.trim()} `;
      }

      formattedPhone += `(${ddd}) `;
      formattedPhone += `${firstPart}-${secondPart}`;
      return formattedPhone;
    }
  );
};

/**
 * 📮 Formata CEP brasileiro
 *
 * @param cep - CEP para formatar
 * @returns CEP formatado (ex: "01234-567")
 */
export const formatCEP = (cep: string): string => {
  const cleaned = cleanCEP(cep);

  if (cleaned.length !== 8) {
    return cep;
  }

  return cleaned.replace(/^(\d{5})(\d{3})$/, '$1-$2');
};

/**
 * 🆔 Formata CPF brasileiro
 *
 * @param cpf - CPF para formatar
 * @returns CPF formatado (ex: "123.456.789-01")
 */
export const formatCPF = (cpf: string): string => {
  const cleaned = cleanDocument(cpf);

  if (cleaned.length !== 11) {
    return '';
  }

  return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
};

/**
 * 🏢 Formata CNPJ brasileiro
 *
 * @param cnpj - CNPJ para formatar
 * @returns CNPJ formatado (ex: "12.345.678/0001-95")
 */
export const formatCNPJ = (cnpj: string): string => {
  const cleaned = cleanDocument(cnpj);

  if (cleaned.length !== 14) {
    return '';
  }

  return cleaned.replace(
    /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
    '$1.$2.$3/$4-$5'
  );
};

/**
 * 💰 Formata valor monetário em Real brasileiro
 *
 * @param value - Valor numérico
 * @param showSymbol - Se deve mostrar símbolo R$
 * @returns Valor formatado (ex: "R$ 1.234,56")
 */
export const formatCurrency = (
  value: number,
  showSymbol: boolean = true
): string => {
  const formatted = value.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return showSymbol ? `R$ ${formatted}` : formatted;
};

/**
 * 📊 Formata porcentagem
 *
 * @param value - Valor decimal (0.15 = 15%)
 * @param decimals - Casas decimais
 * @returns Porcentagem formatada (ex: "15,00%")
 */
export const formatPercentage = (
  value: number,
  decimals: number = 2
): string => {
  return (
    (value * 100).toLocaleString('pt-BR', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }) + '%'
  );
};

// ============== FUNÇÕES DE MÁSCARA ==============

/**
 * 🎭 Aplica máscara de CPF durante digitação
 *
 * @param value - Valor atual do input
 * @returns Valor com máscara (ex: "123.456.789")
 */
export const applyCPFMask = (value: string): string => {
  const cleaned = cleanNumeric(value);
  let masked = cleaned;

  if (cleaned.length >= 4) {
    masked = cleaned.replace(/^(\d{3})(\d)/, '$1.$2');
  }
  if (cleaned.length >= 7) {
    masked = masked.replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3');
  }
  if (cleaned.length >= 10) {
    masked = masked.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4');
  }

  return masked.slice(0, 14);
};

/**
 * 🎭 Aplica máscara de CNPJ durante digitação
 *
 * @param value - Valor atual do input
 * @returns Valor com máscara (ex: "12.345.678/000")
 */
export const applyCNPJMask = (value: string): string => {
  const cleaned = cleanNumeric(value);
  let masked = cleaned;

  if (cleaned.length >= 3) {
    masked = cleaned.replace(/^(\d{2})(\d)/, '$1.$2');
  }
  if (cleaned.length >= 6) {
    masked = masked.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
  }
  if (cleaned.length >= 9) {
    masked = masked.replace(/^(\d{2})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3/$4');
  }
  if (cleaned.length >= 13) {
    masked = masked.replace(
      /^(\d{2})\.(\d{3})\.(\d{3})\/(\d{4})(\d)/,
      '$1.$2.$3/$4-$5'
    );
  }

  return masked.slice(0, 18);
};

/**
 * 🎭 Aplica máscara de telefone durante digitação
 *
 * @param value - Valor atual do input
 * @returns Valor com máscara (ex: "(11) 99999-9999")
 */
export const applyPhoneMask = (value: string): string => {
  const cleaned = cleanNumeric(value);
  let masked = cleaned;

  if (cleaned.length >= 3) {
    masked = cleaned.replace(/^(\d{2})(\d)/, '($1) $2');
  }

  if (cleaned.length >= 8 && cleaned.length <= 11) {
    if (cleaned.length === 11) {
      masked = masked.replace(/^(\(\d{2}\) \d{5})(\d)/, '$1-$2');
    } else if (cleaned.length >= 7) {
      masked = masked.replace(/^(\(\d{2}\) \d{4})(\d)/, '$1-$2');
    }
  }

  return masked.slice(0, 15);
};

/**
 * 🎭 Aplica máscara de CEP durante digitação
 *
 * @param value - Valor atual do input
 * @returns Valor com máscara (ex: "01234-567")
 */
export const applyCEPMask = (value: string): string => {
  const cleaned = cleanNumeric(value);

  if (cleaned.length >= 6) {
    return cleaned.replace(/^(\d{5})(\d)/, '$1-$2').slice(0, 9);
  }

  return cleaned.slice(0, 8);
};

// ============== UTILITÁRIOS DE TEXTO ==============

/**
 * 📝 Remove acentos e normaliza texto
 *
 * @param text - Texto para normalizar
 * @returns Texto sem acentos em minúsculas
 */
export const deburr = (text: string): string => {
  if (!text) return '';
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
};

/**
 * 📝 Remove acentos mantendo capitalização original
 *
 * @param text - Texto para normalizar
 * @returns Texto sem acentos
 */
export const deburrCase = (text: string): string => {
  if (!text) return '';
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
};

/**
 * 📝 Converte para formato título
 *
 * @param text - Texto para converter
 * @returns Texto em formato título
 */
export const toTitleCase = (text: string): string => {
  if (!text) return '';
  return text
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

/**
 * 📝 Capitaliza primeira letra de cada palavra
 *
 * @param text - Texto para capitalizar
 * @returns Texto capitalizado
 */
export const capitalizeWords = (text: string): string => {
  return toTitleCase(text);
};

/**
 * 📝 Gera slug amigável para URLs
 *
 * @param text - Texto para converter
 * @param delimiter - Delimitador para separar palavras (padrão: '-')
 * @returns Slug amigável (ex: "joao-maria-ltda")
 * @example
 * generateSlug('Escola de Dança ABC')          // 'escola-de-danca-abc' (padrão)
 * generateSlug('Escola de Dança ABC', '_')     // 'escola_de_danca_abc' (underscore)
 * generateSlug('Escola de Dança ABC', '')      // 'escoladedancaabc' (sem separador)
 * generateSlug('Escola de Dança ABC', '.')     // 'escola.de.danca.abc' (ponto)
 */
export const generateSlug = (text: string, delimiter: string = '-'): string => {
  // Normalize text: remove accents, special chars, trim whitespace
  const normalized = deburr(text)
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, delimiter);

  // If delimiter is empty, no need to remove duplicates
  if (!delimiter) return normalized;

  // Escape special regex characters in delimiter for safe regex usage
  const escapedDelimiter = delimiter.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  // Remove duplicate delimiters (ex: "palavra--palavra" → "palavra-palavra")
  return normalized.replace(new RegExp(`${escapedDelimiter}+`, 'g'), delimiter);
};

/**
 * 📧 Gera username para email a partir de nome completo
 *
 * Wrapper de generateSlug() usando ponto como delimitador.
 *
 * @param name - Nome completo da pessoa
 * @returns Username normalizado (ex: "joao.da.silva")
 * @example
 * generateEmailUsername('João da Silva')   // 'joao.da.silva'
 * generateEmailUsername('Maria  Santos')   // 'maria.santos' (remove espaços extras)
 */
export const generateEmailUsername = (name: string): string => {
  if (!name) return '';

  // Usa generateSlug com ponto como delimiter
  return generateSlug(name, '.');
};

/**
 * 📝 Limpa texto para nomes de arquivos
 *
 * @param text - Texto para limpar
 * @returns Texto seguro para arquivos
 */
export const sanitizeText = (text: string): string => {
  return text.replace(/[/\\:*?"<>|]/g, '-');
};

/**
 * 📁 Sanitiza nome de arquivo removendo caracteres inválidos
 *
 * @param filename - Nome do arquivo para sanitizar
 * @returns Nome seguro para sistemas de arquivos
 */
export const sanitizeFileName = (filename: string): string => {
  return filename.replace(/[^a-zA-Z0-9.-]/g, '_');
};

/**
 * 📝 Limpa nome removendo tabs, quebras e espaços extras
 *
 * @param text - Texto para limpar
 * @returns Texto limpo
 */
export const cleanName = (text: string): string => {
  return String(text || '')
    .replace(/[\t\n\r]/g, '')
    .trim();
};

/**
 * 📝 Gera string de busca normalizada a partir de array
 *
 * @param values - Array de strings para combinar
 * @returns String de busca normalizada
 */
export const getSearchString = (
  values: (string | null | undefined)[]
): string => {
  return deburr(values.filter(Boolean).join(' '));
};

/**
 * 📝 Trunca texto com reticências
 *
 * @param text - Texto para truncar
 * @param length - Comprimento máximo
 * @returns Texto truncado (ex: "Texto muito...")
 */
export const truncateText = (text: string, length: number): string => {
  if (text.length <= length) return text;
  return text.slice(0, length).trim() + '...';
};

/**
 * 📝 Gera ID aleatório alfanumérico
 *
 * @param length - Comprimento do ID
 * @returns ID aleatório (ex: "aB3dEf7H")
 */
export const makeId = (length: number = 8): string => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

// ============== UTILITÁRIOS DE BUSCA ==============

/**
 * 🔍 Algoritmo de distância Levenshtein para busca difusa
 *
 * @param source - String de origem
 * @param target - String de destino
 * @returns Distância de edição entre strings
 */
export const levenshteinDistance = (source: string, target: string): number => {
  const matrix: number[][] = [];

  for (let i = 0; i <= source.length; i++) {
    matrix.push([i]);
  }

  for (let j = 1; j <= target.length; j++) {
    matrix[0].push(j);
  }

  for (let i = 1; i <= source.length; i++) {
    for (let j = 1; j <= target.length; j++) {
      matrix[i].push(0);

      if (source[i - 1] === target[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        const minimum = Math.min(
          matrix[i - 1][j] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j - 1] + 1
        );
        matrix[i][j] = minimum;
      }
    }
  }

  return matrix[source.length][target.length];
};

/**
 * 🔍 Score de similaridade normalizado (0-1)
 *
 * @param source - String de origem
 * @param target - String de destino
 * @returns Score entre 0 e 1 (1 = match exato)
 */
export const similarityScore = (source: string, target: string): number => {
  if (!source || !target) return 0;

  const distance = levenshteinDistance(source, target);
  const maxLength = Math.max(source.length, target.length);

  return 1 - distance / maxLength;
};

/**
 * 🔍 Score de busca difusa para matches parciais
 *
 * @param searchTerm - Termo para buscar
 * @param text - Texto onde buscar
 * @returns Score entre 0 e 1
 */
export const fuzzySearchScore = (searchTerm: string, text: string): number => {
  if (!searchTerm || !text) return 0;

  const normalizedSearch = deburr(searchTerm);
  const normalizedText = deburr(text);

  if (normalizedText.includes(normalizedSearch)) {
    return 0.9;
  }

  const searchWords = normalizedSearch.split(' ').filter(Boolean);
  let totalScore = 0;

  for (const word of searchWords) {
    let bestScore = 0;

    const wholeTextScore = similarityScore(word, normalizedText);
    bestScore = Math.max(bestScore, wholeTextScore);

    const textWords = normalizedText.split(' ');
    for (const textWord of textWords) {
      const wordScore = similarityScore(word, textWord);
      bestScore = Math.max(bestScore, wordScore);
    }

    totalScore += bestScore;
  }

  return totalScore / searchWords.length;
};

// ============== VALIDAÇÕES (RE-EXPORTS) ==============
// Re-exporta validadores de ValidatorUtils para compatibilidade com código existente

/**
 * 🔍 Valida CPF brasileiro
 *
 * Re-exportado de ValidatorUtils.ts
 *
 * @param cpf - CPF para validar
 * @returns True se CPF é válido
 */
export { validateCPF };

/**
 * 🔍 Valida CNPJ brasileiro
 *
 * Re-exportado de ValidatorUtils.ts
 *
 * @param cnpj - CNPJ para validar
 * @returns True se CNPJ é válido
 */
export { validateCNPJ };

/**
 * 🔍 Valida telefone brasileiro
 *
 * Re-exportado de ValidatorUtils.ts
 *
 * @param phone - Telefone para validar
 * @returns True se telefone é válido
 */
export { validatePhone };

/**
 * 🔍 Valida documento baseado no tipo
 *
 * @param document - Documento para validar
 * @param type - Tipo do documento (CPF ou CNPJ)
 * @returns True se documento é válido
 */
export const validateDocument = (
  document: string,
  type: 'CPF' | 'CNPJ'
): boolean => {
  return type === 'CPF' ? validateCPF(document) : validateCNPJ(document);
};

/**
 * 🔍 Detecta tipo de documento automaticamente
 *
 * @param document - Documento para analisar
 * @returns Tipo detectado (CPF, CNPJ ou INVALID)
 */
export const getDocumentType = (
  document: string
): 'CPF' | 'CNPJ' | 'INVALID' => {
  const cleaned = cleanDocument(document);

  if (cleaned.length === 11) return 'CPF';
  if (cleaned.length === 14) return 'CNPJ';
  return 'INVALID';
};

// ============== EXPORT DEFAULT OBJECT ==============

export const StringUtils = {
  // Limpeza
  cleanNumeric,
  cleanAlphanumeric,
  cleanDocument,
  cleanPhone,
  cleanCEP,
  cleanName,

  // Formatação
  formatPhone,
  formatCEP,
  formatCPF,
  formatCNPJ,
  formatCurrency,
  formatPercentage,

  // Máscaras
  applyCPFMask,
  applyCNPJMask,
  applyPhoneMask,
  applyCEPMask,

  // Utilitários de texto
  deburr,
  deburrCase,
  toTitleCase,
  capitalizeWords,
  generateSlug,
  generateEmailUsername,
  sanitizeText,
  sanitizeFileName,
  getSearchString,
  truncateText,
  makeId,

  // Utilitários de busca
  levenshteinDistance,
  similarityScore,
  fuzzySearchScore,

  // Validações
  validateCPF,
  validateCNPJ,
  validateDocument,
  getDocumentType,
};

export default StringUtils;
