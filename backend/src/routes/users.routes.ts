import { Router } from "express";
import Authenticated from "middleware/authenticated";
import UserService from "../services/UserService";

const UsersRouter = Router();

UsersRouter.use(Authenticated);

UsersRouter.post("/", async (request, response) => {
    try {
        const { name, email, password } = request.body;
        
        const userService = new UserService();

        const user = await userService.store({ 
            name, 
            email, 
            password
        });

        // delete user.password;

        return response.json(user);

    } catch (err) {
        return response.status(400).json({ error: err });
    }
});

export default UsersRouter;