export default {
  type: 'object',
  pathParameters: {
    id: { type: 'string' }
  },
  required: ['id']
} as const;
