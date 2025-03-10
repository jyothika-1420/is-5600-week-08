// tests/app.test.js
const request = require('supertest');
const app = require('../app.js');

describe('The Express Server', () => {
  let server;

  // Start server before all tests
  beforeAll(done => {
    server = app.listen(0, () => {
      done();
    });
  });

  // Close server after all tests
  afterAll(done => {
    if (server) {
      server.close(done);
    } else {
      done();
    }
  });

  test('should return response', async () => {
    const res = await request(app)
      .get('/');
    expect(res.statusCode).toEqual(200);
  });

  test('should respond at /products', async () => {
    const res = await request(app)
      .get('/products');
    expect(res.statusCode).toEqual(200);
  });

  test('should respond at /orders', async () => {
    const res = await request(app)
      .get('/orders');
    expect(res.statusCode).toEqual(200);
  });
});