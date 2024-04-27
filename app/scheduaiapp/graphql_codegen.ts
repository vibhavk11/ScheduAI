import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: '../../WebAPI/generated-schema.graphql', //'http://localhost:5094/graphql',
  documents: 'src/graphql/**/*.graphql',
  generates: {
    'src/graphql/generated/': {
      preset: 'client',
      plugins: [],
    },
  },
}

export default config
