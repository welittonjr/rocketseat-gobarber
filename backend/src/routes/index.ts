import { Router } from 'express'
import sessionsRouter from './sessions.routes'
import usersRouter from './users.routes'
import scheduleRouter from './schedules.routes'

const routes = Router()

routes.use('/alive', (_, response) => {
  return response.status(200).json({ message: "I\'m alive" })
})

routes.use('/users', usersRouter)
routes.use('/schedules', scheduleRouter)
routes.use('/sessions', sessionsRouter)

export default routes
