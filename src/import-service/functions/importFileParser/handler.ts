import { S3Event, S3Handler } from 'aws-lambda';
import { importFileProvider } from '../../providers/ImportFileProvider';

const importFileParser: S3Handler = async (event: S3Event) => {
  try {
    console.log('[importFileParser lambda] event:', JSON.stringify(event));
    const record = event.Records[0];
    const fileName = record.s3.object.key;
    console.log('[importFileParser lambda]: Uploaded file ', JSON.stringify(fileName));
    const result = await importFileProvider.parseUploadedFile(fileName);
    console.log('RESULT:', result);
  } catch (error) {
    console.log('[importFileParser lambda]: Error while parsing uploaded file - ', JSON.stringify(error));
  }
};

export const main = importFileParser;
