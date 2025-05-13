import app from './index.js';

// Start the server (only for local development)
const start = async () => {
  try {
    await app.listen({ port: process.env.PORT })
    app.log.info(`Server is running on http://localhost:${process.env.PORT}`)
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

console.log(process.env.NODE_ENV)
// Start the server
if (process.env.NODE_ENV !== 'production')  await start()

export default async function handler(req, reply) {
  await app.ready()
  app.server.emit('request', req, reply)
}
