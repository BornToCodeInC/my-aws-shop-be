import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { productProvider } from '@providers/ProductProvider';
import schema from '@functions/getProductById/schema';

const handler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  try {
    const { id } = event.pathParameters;
    const product = await productProvider.getProductById(id);
    return formatJSONResponse(product);
  } catch (err) {
    console.log(err);
    return formatJSONResponse({ error: err.message }, 500);
  }
};

export const main = middyfy(handler);
