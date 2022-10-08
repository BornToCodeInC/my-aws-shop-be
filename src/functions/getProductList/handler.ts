import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { productProvider } from '@providers/ProductProvider';

const getProductList: ValidatedEventAPIGatewayProxyEvent<never> = async (event) => {
  try {
    console.log('Get Product List Lambda: Incoming Event: ', JSON.stringify(event));
    const products = await productProvider.getAllProducts();
    return formatJSONResponse(products);
  } catch (err) {
    console.log(err);
    return formatJSONResponse({ error: err.message }, 500);
  }
};

export const main = middyfy(getProductList);
