import { DynamoDB } from 'aws-sdk';
import { Product } from '@types/product';

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
    const params: DynamoDB.Types.GetItemInput = {
      TableName: this.table,
      Key: { id: { S: id }},
    };
    const {Item = null} = await this.db.get(params).promise();
    if (!Item) {
      throw new Error('Product not found');
    }
    return Item;
  }
  async addProduct (product: Product): Promise<Product> {
    const params: DynamoDB.Types.PutItemInput = {
      TableName: this.table,
      Item: DynamoDB.Converter.marshall(product),
      ConditionExpression: 'attribute_not_exists(id)',
    };
    await this.db.put(params).promise();

    return product;
  }
}

export const productProvider = new ProductProvider(new DynamoDB.DocumentClient(), process.env.TABLE_NAME);
