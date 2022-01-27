import { getRepository } from "typeorm";
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import User from '../entities/User';

interface Request {
    email: string;
    password: string;
}

interface Response {
    user: User;
    token: String;
}

class AuthenticateUserService {
    public async execute({ email, password }: Request): Promise<Response> {
        const usersRepository = getRepository(User);        
        
        const user = await usersRepository.findOne({ where: { email } })
        
        if (!user) {
            throw new Error('Incorrenct email/password combination.');
        }

        const passwordMatched = await compare(password, user.password);

        if (!passwordMatched) {
            throw new Error('Incorrenct email/password combination.');
        }

        const token = sign({}, 'hash_2021', {
            subject: user.id.toString(),
            expiresIn: '1d'
        });
        console.log(token);
        return {
            user,
            token,
        };
        
    }
}

export default AuthenticateUserService;