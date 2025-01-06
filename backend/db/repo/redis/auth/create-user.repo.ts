import { User } from '../../../../app/auth/entity/user.entity';
import { client } from '../redis.client';

export const createUser = async ({
  user,
}: {
  user: User;
}): Promise<Omit<User, 'password' | 'salt'> | undefined> => {
  try {
    await client.hSet(user.id, {
      id: user.id,
      username: user.username,
      password: user.password,
      salt: user.salt,
    });

    const createdUser = await client.hGetAll(user.id);

    return {
      id: createdUser.id,
      username: createdUser.username,
    };
  } catch (error) {
    // do something with the error
    console.error(error);
  }
};
