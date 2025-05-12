import app from './index.js';

// Start the server
// const start = async () => {

// }


// Start the server (only for local development)
// if (process.env.NODE_ENV !== 'production') {
//   try {
//     app.listen({ port: process.env.PORT })
//     app.log.info(`Server is running on http://localhost:${process.env.PORT}`)
//   } catch (err) {
//     app.log.error(err)
//     process.exit(1)
//   }
}
// start()

export default async function handler(req, reply) {
  await app.ready()
  app.server.emit('request', req, reply)
}
