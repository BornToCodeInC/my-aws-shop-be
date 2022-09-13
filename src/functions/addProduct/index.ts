import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'post',
        path: '/products',
        cors: true,
        responses: {
          201: {
            description: 'successful API Response',
            bodyType: 'Product'
          }
        }
      },
    },
  ],
};
