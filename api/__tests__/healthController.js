import Fastify from 'fastify';
import routes from '../routes.js';

describe('Health Check API', () => {
  let fastify;

  beforeAll(async () => {
    fastify = Fastify();
    fastify.register(routes);
  });

  afterAll(async () => {
    await fastify.close();
  });

  it('should return 200 OK for health check', async () => {
    const response = await fastify.inject({
      method: 'GET',
      url: '/api/health',
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toEqual({ status: 'OK' });
  });
});
