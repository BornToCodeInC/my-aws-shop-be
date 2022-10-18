import { DynamoDB } from 'aws-sdk';
import { Product } from '@sharedTypes/product';

class ProductProvider {
  constructor(private readonly db: DynamoDB.DocumentClient, private readonly table: string) {
  }
  async getAllProducts (): Promise<DynamoDB.ItemList> {
    const params: DynamoDB.Types.ScanInput = {
      TableName: this.table
    };
    const {Items = []} = await this.db.scan(params).promise();
    if (!Items) {
      throw new Error('ProductList not found');
    }
    return Items;
  }
  async getProductById (id: string): Promise<DynamoDB.DocumentClient.AttributeMap> {
    const params = {
      TableName: this.table,
      KeyConditionExpression: 'id = :id',
      ExpressionAttributeValues: {':id': id},
    };
    const {Items = []} = await this.db.query(params).promise();
    if (!Items.length) {
      throw new Error('Product not found');
    }
    return Items[0];
  }
  async addProduct (product: Product): Promise<Product> {
    console.log('Product to add: ', product);
    const params = {
      TableName: this.table,
      Item: product,
      ConditionExpression: 'attribute_not_exists(id)',
    };
    console.log('Product: ', params.Item);
    await this.db.put(params).promise();

    return product;
  }
}

export const productProvider = new ProductProvider(new DynamoDB.DocumentClient(), process.env.TABLE_NAME);
