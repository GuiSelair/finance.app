export default {
  // Limpa automaticamente as chamadas de mock e instâncias entre cada teste
  clearMocks: true,

  // Indica qual provedor deve ser usado para instrumentar o código para cobertura
  coverageProvider: 'v8',

  // Define o diretório raíz para testes
  roots: ['<rootDir>/src'],

  // Mapeia os paths conforme o tsconfig.json
  moduleNameMapper: {
    '^@modules/(.*)$': '<rootDir>/src/modules/$1',
    '^@shared/(.*)$': '<rootDir>/src/shared/$1',
    '^@helpers/(.*)$': '<rootDir>/src/shared/helpers/$1',
    '^@errors/(.*)$': '<rootDir>/src/shared/errors/$1',
    '^@infra/(.*)$': '<rootDir>/src/shared/infra/$1',
    '^@providers/(.*)$': '<rootDir>/src/shared/providers/$1',
  },

  // Preset usado como base para a configuração do Jest
  preset: 'ts-jest',

  // Ambiente de teste que será usado para testar
  testEnvironment: 'node',

  // Padrões globais que o Jest usa para detectar arquivos de teste
  testMatch: ['**/*.spec.ts'],

  // Adiciona suporte a paths conforme o tsconfig.json
  setupFilesAfterEnv: ['tsconfig-paths/register'],
};
