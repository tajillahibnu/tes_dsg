import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import userRoute from './routes/userRoutes.js'
import bookRoute from './routes/bookRoutes.js'

const app = new Hono()
const PORT = Number(process.env.APP_PORT) || 3000;


app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route('api/users', userRoute);
app.route('api/master/books', bookRoute);


serve({
  fetch: app.fetch,
  port: PORT
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
