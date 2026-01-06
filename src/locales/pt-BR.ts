/**
 * Traduções em Português Brasil
 * @description Strings da interface em português para componentes
 */
export default {
  // ============== VALIDATION - Mensagens de Validação ==============
  validation: {
    // Mensagens Genéricas
    required: 'Campo obrigatório',
    invalid: 'Valor inválido',

    // String validations
    minLength: 'Mínimo de {min} caracteres',
    maxLength: 'Máximo de {max} caracteres',
    email: 'E-mail inválido',
    url: 'URL inválida',

    // Números
    min: 'Valor mínimo: {min}',
    max: 'Valor máximo: {max}',
    integer: 'Deve ser um número inteiro',
    positive: 'Deve ser um número positivo',

    // Documentos Brasileiros
    brazil: {
      cpf: {
        required: 'CPF é obrigatório',
        invalid: 'CPF inválido',
        invalidFormat: 'Formato inválido. Use: 000.000.000-00',
      },
      cnpj: {
        required: 'CNPJ é obrigatório',
        invalid: 'CNPJ inválido',
        invalidFormat: 'Formato inválido. Use: 00.000.000/0000-00',
      },
      cep: {
        required: 'CEP é obrigatório',
        invalid: 'CEP inválido',
        invalidFormat: 'Formato inválido. Use: 00000-000',
      },
      phone: {
        required: 'Telefone é obrigatório',
        invalid: 'Telefone inválido',
        invalidFormat: 'Formato inválido. Use: (00) 00000-0000',
      },
    },

    // Datas
    date: 'Data inválida',
    dateMin: 'Data mínima: {min}',
    dateMax: 'Data máxima: {max}',
  },
};
