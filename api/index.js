import mongoose from 'mongoose'
import Fastify from 'fastify'
import dotenv from 'dotenv'
import routes from './routes.js'
import cors from '@fastify/cors'

dotenv.config()

const app = Fastify({
  logger: true,
})

// Register the CORS plugin
app.register(cors, {
  origin: '*', // Adjust this to your needs (e.g., specify allowed origins)
})

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.log.info('MongoDB connected'))
  .catch(err => app.log.error('MongoDB connection error:', err))

// Register routes
app.register(routes)

export async function handler(req, reply) {
  await app.ready()
  app.server.emit('request', req, reply)
}

export default app;

