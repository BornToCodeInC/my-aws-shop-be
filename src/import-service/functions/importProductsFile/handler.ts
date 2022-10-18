import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { formatJSONResponse } from '@libs/api-gateway';
import { importFileProvider } from '../../providers/ImportFileProvider';

const importProductsFile: ValidatedEventAPIGatewayProxyEvent<never> = async (event) => {
  const { name } = event.queryStringParameters;

  if (!name) {
    console.log(`Invalid URL. Query parameter 'name' is required`);
    return formatJSONResponse({ error: `Invalid URL. Query parameter 'name' is required` }, 400);
  }

  try {
    const signedUrl = await importFileProvider.getUploadUrl(name);
    console.log('Signed Url has been successfully created: ', signedUrl);
    return formatJSONResponse(signedUrl);
  } catch (err) {
    console.log('Signed url is not created:', err);
    return formatJSONResponse({ error: err.message }, 500);
  }
};

export const main = middyfy(importProductsFile);
