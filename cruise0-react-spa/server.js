const fastify = require('fastify')({ logger: true })
const path = require('path')

// Serve the static assets
fastify.register(require('fastify-static'), {
  root: path.join(__dirname, ''),
  prefix: '/'
})

const start = async () => {
  try {
    await fastify.listen(3000, "0.0.0.0")
    console.log("server listening on:", fastify.server.address().port)

  } catch (error) {
    fastify.log.error(error)
  }
}
start()
