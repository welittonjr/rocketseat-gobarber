import { Router } from 'express'
import multer from 'multer'
import uploadConfig from '../../config/upload'

import UserService from '../../modules/users/services/UserService'

import { Authenticated } from '../middleware/authenticated'

const UsersRouter = Router()
const upload = multer(uploadConfig)

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
  upload.single('avatar'),
  async (request, response) => {
    try {
      const userService = new UserService()

      const user = await userService.updateAvatar({
        user_id: request.user.id as string,
        avatarFilename: request.file?.filename || '',
      });
      
      return response.json(user)
    } catch (err) {
      return response.status(400).json({ error: err })
    }
  }
)

export default UsersRouter
