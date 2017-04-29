export const service = {
  name: 'apidoc generator',
  description: 'This is an api',
  organization: {
    key: 'bryzek',
  },
  application: {
    key: 'apidoc-generator',
  },
  resources: [
    {
      type: 'generator',
      plural: 'generators',
      operations: [
        {
          method: 'GET',
          path: '/generators',
          parameters: [
            {
              name: 'key',
              type: 'string',
              location: 'Query',
              required: false,
              description: 'Filter generators with this key',
            },
            {
              name: 'limit',
              type: 'integer',
              location: 'Query',
              required: true,
              description: 'The number of records to return',
              default: '100',
              minimum: 0,
            },
            {
              name: 'offset',
              type: 'integer',
              location: 'Query',
              required: true,
              description: 'Used to paginate. First page of results is 0.',
              default: '0',
              minimum: 0,
            },
          ],
          responses: [
            {
              code: {
                integer: {
                  value: 200,
                },
              },
              type: '[generator]',
            },
          ],
          attributes: [],
          description: 'Get all available generators',
        },
        {
          method: 'GET',
          path: '/generators/:key',
          parameters: [
            {
              name: 'key',
              type: 'string',
              location: 'Path',
              required: true,
            },
          ],
          responses: [
            {
              code: {
                integer: {
                  value: 200,
                },
              },
              type: 'generator',
            },
            {
              code: {
                integer: {
                  value: 404,
                },
              },
              type: 'unit',
            },
          ],
          attributes: [],
          description: 'Get generator with this key',
        },
      ],
      attributes: [],
      path: '/generators',
    },
  ],
};
