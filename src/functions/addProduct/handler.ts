import { v4 as uuidv4 } from 'uuid';
import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { productProvider } from '@providers/ProductProvider';
import schema from '@functions/addProduct/schema';
import { Product } from '@sharedTypes/product';

const handler: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  try {
    console.log('Add Product Lambda: Incoming Event: ', JSON.stringify(event));
    const { title = '', description = '', price = 0, count = 0} = event.body as unknown as Partial<Product>;
    const id = uuidv4();
    const product = await productProvider.addProduct({id, title, description, price, count} as Product);
    return formatJSONResponse(product, 201);
  } catch (err) {
    console.log(err);
    return formatJSONResponse({ error: err.message }, 500);
  }
};

export const main = middyfy(handler);
