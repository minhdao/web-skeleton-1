import { createClient } from 'redis';
import { User } from '../../../app/auth/entity/user.entity';
import { createUser } from './auth/create-user.repo';

export const client = createClient({
  url: process.env.REDIS_URL,
});

client.on('error', (err) => console.error('redis', err));

export type RedisRepo = {
  createUser: ({
    user,
  }: {
    user: User;
  }) => Promise<Omit<User, 'password' | 'salt'> | undefined>;
};

export const initRedisRepo = async (): Promise<void> => {
  await client.connect();
};

export const getRedisRepo = async (): Promise<RedisRepo> => {
  if (!client.isOpen) {
    await client.connect();
  }

  return {
    createUser,
  };
};
