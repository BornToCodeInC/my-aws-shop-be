import csv from 'csv-parser';
import {
  CopyObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3ClientConfig,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { IMPORT_BUCKET_NAME, REGION } from '@helpers/constants';

class ImportFileProvider {
  private readonly bucket = IMPORT_BUCKET_NAME;
  constructor(private readonly s3Client: S3Client) {
  }

  async getUploadUrl(fileName: string): Promise<string> {
    try {
      const catalogPath = `uploaded/${fileName}`;
      const params = {
        Bucket: this.bucket,
        Key: catalogPath,
        ContentType: 'text/csv',
      };

      return await getSignedUrl(this.s3Client, new PutObjectCommand(params));
    } catch(error) {
      console.log(error);
    }
  }

  async parseUploadedFile(filename: string): Promise<any>{
    try {
      const params = {
        Bucket: this.bucket,
        Key: filename,
      };

      const command = new GetObjectCommand(params);

      const response = await this.s3Client.send(command);
      let parsedData = [];
      return new Promise((resolve, reject) => {
        response.Body
          .pipe(csv())
          .on('error', (error) => {
            console.log(`[ImportFileProvider parseUploadedFile]: Error while parsing scv file - ${JSON.stringify(error)}`);
            return reject(error);
          })
          .on('data', (item) => {
            console.log('[ImportFileProvider parseUploadedFile]: item', item);
            parsedData.push(item);
          })
          .on('end', () => {
            console.log(`[ImportFileProvider parseUploadedFile]: SCV-file parsed successfully`);
            return resolve(parsedData);
          });
      });
    } catch (error) {
      console.log('[parseUploadedFile]: ERROR:', error);
    }
  }
}

const s3Configuration: S3ClientConfig = { region: REGION };
export const importFileProvider = new ImportFileProvider(new S3Client(s3Configuration));
