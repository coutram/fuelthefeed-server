import mongoose from 'mongoose'
import Fastify from 'fastify'
import dotenv from 'dotenv'
import routes from './routes.js'
import fastifyCors from 'fastify-cors'

dotenv.config()

const app = Fastify({
  logger: true,
})

app.register(fastifyCors, {
  origin: '*', // Adjust this to your needs
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.log.info('MongoDB connected'))
  .catch(err => app.log.error('MongoDB connection error:', err))

// Register routes
app.register(routes)

export default app;