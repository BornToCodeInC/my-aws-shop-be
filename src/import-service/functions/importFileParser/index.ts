import { handlerPath } from '@libs/handler-resolver';
import { IMPORT_BUCKET_NAME } from '@helpers/constants';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      s3: {
        bucket: IMPORT_BUCKET_NAME,
        event: 's3:ObjectCreated:*',
        rules: [{
          prefix: 'uploaded/',
        },
          {
            suffix: '.csv'
          }],
        existing: true
      },
    },
  ],
};
