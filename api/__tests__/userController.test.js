import mongoose from 'mongoose';
import app from '../index.js'; // Import the Fastify instance

beforeAll(async () => {
  // Check if already connected
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect('mongodb://localhost:27017/test_db', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
});

beforeEach(async () => {
  // Clear the database before each test
  if (mongoose.connection.readyState === 1) { // Check if connected
    await mongoose.connection.db.dropDatabase();
  }
});

afterAll(async () => {
  // Close the database connection after all tests
  await mongoose.connection.close();
});

describe('User API', () => {
  it('should register a new user', async () => {
    const uniqueEmail = `test_${Date.now()}@example.com`; // Generate a unique email

    const response = await app.inject({
      method: 'POST',
      url: '/api/user',
      payload: {
        email: uniqueEmail, // Use the unique email
        walletId: '0xe4b58b2a58ed3c5ec0d8f9cd7fdfe516f3e3bacbd9bbac3def8cb366db3cd66b',
        firstName: 'Test',
        lastName: 'User',
      },
    });

    expect(response.statusCode).toBe(201);
    expect(response.json()).toEqual(expect.objectContaining({
      message: 'User registered successfully',
      user: expect.objectContaining({
        email: uniqueEmail, // Check against the unique email
      }),
    }));
  });
});