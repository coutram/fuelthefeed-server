import { ObjectId } from 'mongodb';
import { registerUser, getUserByEmail, getUserByWalletId } from './controllers/userController.js';

export default async function routes(fastify, options) {
  // Health check route
  fastify.get('/api/health', async (request, reply) => {
    return reply.status(200).send({ status: 'OK' });
  });

  // User registration route
  fastify.post('/api/user', registerUser);

  // GET user by email route
  fastify.get('/api/user/email/:email', getUserByEmail);

  // GET user by wallet ID route
  fastify.get('/api/user/wallet/:walletId', getUserByWalletId);

  // Example Fastify route for user creation
  fastify.post('/api/users', async (request, reply) => {
    const { firstName, lastName, email, walletId } = request.body;
    // Logic to create user in the database
    // Return success or error response
  });

  // Add more routes as needed
}
