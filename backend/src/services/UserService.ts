import { getRepository } from "typeorm";
import User from "../entity/User"
interface Request {
    name: string;
    email: string;
    password: string;
}
class UserService {

    public async store({ name, email, password }: Request): Promise<User> {
        const usersRepository = getRepository(User);

        const checkUserExists = await usersRepository.findOne({
            where: { email },
        });

        if (checkUserExists) {
            throw new Error('Email address already used');
        }

        const user = usersRepository.create({
            name,
            email,
            password,
        });

        return await usersRepository.save(user);
    }
}

export default UserService;