import { getRepository } from 'typeorm'
import { hash } from 'bcryptjs'
import User from '../entity/User'
import uploadConfig from '../config/upload'

interface Request {
    name: string;
    email: string;
    password: string;
}
interface RequestAvatar {
  user_id: string;
  avatarFilename: string;
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

    public async updateAvatar({ user_id, avatarFilename }: RequestAvatar) {
      const usersRepository = getRepository(User);

      const user = await usersRepository.findOne(user_id)

      if(!user) {
        throw new Error('Only authenticated users can change avatar.')
      }

      if (user.avatar) {
        const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar)
        const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath)

        if(userAvatarFileExists) {
          await fs.promises.unlink(userAvatarFilePath);
        }
      }
      user.avatar = avatarFilename

      await usersRepository.save(user)
      
      return user
    }
}

export default UserService;