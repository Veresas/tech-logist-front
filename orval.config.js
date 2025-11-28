export default {
    api: {
      input: './swagger.json',
      output: {
        target: './src/api/generated.ts',
        schemas: './src/api/model',
        client: 'react-query',
        zod: true,
        mode: 'tags-split',
        override: {
            mutator: {
              path: './src/utils/customAxios.ts',
              name: 'apiClient',
            },
          },
      },
    },
};