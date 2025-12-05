export default {
  mainApi: {
    input: './swaggers/main_api/swagger.json',
    output: {
      target: './src/api/main/generated.ts',
      schemas: './src/api/main/model',
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
  analyticsApi: {
    input: './swaggers/analytic_api/swagger.json',
    output: {
      target: './src/api/analytics/generated.ts',
      schemas: './src/api/analytics/model',
      client: 'react-query',
      zod: true,
      mode: 'tags-split',
      override: {
          mutator: {
            path: './src/utils/customAxiosAnalytic.ts',
            name: 'apiClient',
          },
        },
    },
  },
};
