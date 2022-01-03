import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import routes from './src/routes'
import './src/database'
import uploadConfig from './src/config/upload'

if (process.env.NODE_ENV === 'dev') {
  dotenv.config()
}

const app = express()

app.use(express.json())
app.use('/files', express.static(uploadConfig.directory))
app.use(cors())
app.use(routes)

app.listen(3000, () => {
  console.log(' Server started on port 3000!')
})
