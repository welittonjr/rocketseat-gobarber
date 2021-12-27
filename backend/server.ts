import express from 'express'
import * as dotenv from 'dotenv'
import { Cors } from './src/middleware/cors'
import routes from './src/routes'
import './src/database'
import uploadConfig from './src/config/upload'

if (process.env.NODE_ENV === 'dev') {
  dotenv.config()
}

const app = express()

app.use(express.json())
app.use('/files', express.static(uploadConfig.directory))
app.use(Cors)
app.use(routes)

app.listen(3000, () => {
  console.log(' Server started on port 3000!')
})
