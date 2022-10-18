export default {
  type: 'object',
  requestParameters: {
    name: { type: 'string' }
  },
  required: ['name']
} as const;
