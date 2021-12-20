import { Router } from 'express'
import multer from 'multer'
import uploadConfig from '../config/upload'

import UserService from '../services/UserService'

import { Authenticated } from '../middleware/authenticated'

const UsersRouter = Router()
const upload = multer(uploadConfig)

UsersRouter.use(Authenticated)

UsersRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body

    const userService = new UserService()

    const user = await userService.store({
      name,
      email,
      password
    })

    // delete user.password;

    return response.json(user)
  } catch (err) {
    return response.status(400).json({ error: err })
  }
})

UsersRouter.patch('/avatar',
  Authenticated,
  upload.single('file'),
  async (request, response) => {
    return response.json({ ok: true })
  }
)

export default UsersRouter
