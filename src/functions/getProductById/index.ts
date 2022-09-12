import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'products/{id}',
        cors: true,
        responses: {
          200: {
            description: 'successful API Response',
            bodyType: 'Product'
          }
        }
      },
    },
  ],
};
