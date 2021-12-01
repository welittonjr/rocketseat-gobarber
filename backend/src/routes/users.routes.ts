import { Router } from "express";
import UserService from "../services/UserService";

const UsersRouter = Router();

UsersRouter.post("/", async (request, response) => {
    try {
        const { name, email, password } = request.body;
        
        const userService = new UserService();

        const user = await userService.store({ 
            name, 
            email, 
            password
        });

        return response.json(user);

    } catch (err) {
        return response.status(400).json({ error: err });
    }
});

export default UsersRouter;