import products from '../mocks/products.json';
class ProductProvider {
  constructor() {
  }
  async getAllProducts () {
    const productList = await products;
    if (!productList) {
      throw new Error('ProductList not found');
    }
    return productList;
  }
  async getProductById (id: string) {
    const product = products.find(
      (item) => item.id === id
    );
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  }
}

export const productProvider = new ProductProvider();
