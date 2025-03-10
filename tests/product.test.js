// tests/products.test.js
const { mockDb, mockProducts } = require('./db.mock');
const { list, get, destroy } = require('../products');

// Mock the db module to use our mockDb
jest.mock('../db', () => mockDb);

describe('Product Module', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('list', () => {
    it('should list products', async () => {
      const products = await list();
      expect(products.length).toBe(2);
      expect(products[0].description).toBe('Product 1');
      expect(products[1].description).toBe('Product 2');
    });
  });

  describe('get', () => {
    it('should get a product by id', async () => {
      // Mock the Product.findById method to return a specific product
      mockModel.findById = jest.fn().mockResolvedValue({ 
        _id: 'product123',
        description: 'Product 1',
        name: 'Test Product',
        price: 29.99
      });

      // Call get with a product ID
      const productId = 'product123';
      const product = await get(productId);
      
      // Assert that product exists
      expect(product).toBeDefined();
      
      // Assert that product properties match expected values
      expect(product.description).toBe('Product 1');
      expect(product.name).toBe('Test Product');
      expect(product.price).toBe(29.99);
      
      // Verify the mock was called with the correct ID
      expect(mockModel.findById).toHaveBeenCalledWith(productId);
    });
  });

  describe('destroy', () => {
    it('should delete a product', async () => {
      // Mock the deleteOne method to return a successful deletion result
      mockModel.deleteOne = jest.fn().mockResolvedValue({ deletedCount: 1 });
      
      // Call destroy with a product ID
      const productId = 'product123';
      const result = await destroy(productId);
      
      // Assert that result exists
      expect(result).toBeDefined();
      
      // Assert that deletedCount matches expected value
      expect(result.deletedCount).toBe(1);
      
      // Verify the mock was called with the correct ID
      expect(mockModel.deleteOne).toHaveBeenCalledWith({ _id: productId });
    });
  });
});