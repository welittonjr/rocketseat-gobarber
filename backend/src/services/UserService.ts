import { getRepository } from "typeorm";
import { hash } from "bcryptjs";
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

        const hashedpassword = await hash(password, 10);

        const user = usersRepository.create({
            name,
            email,
            password: hashedpassword,
        });

        return await usersRepository.save(user);
    }
}

export default UserService;