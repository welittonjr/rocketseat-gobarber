import { Router } from 'express';
import usersRouter from './users.routes';

const routes = Router();

routes.use('/alive', (_, response) => {
    return response.status(200).json({ message: "I\'m alive" })
});

routes.use('/users', usersRouter);

export default routes;