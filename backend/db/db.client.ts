import { getRedisRepo, RedisRepo } from './repo/redis/redis.client';

const redisRepo = getRedisRepo();

export const getDbClient = async ({
  type,
}: {
  type: 'redis' | 'pg';
}): Promise<RedisRepo | undefined> => {
  switch (type) {
    case 'redis':
      return await redisRepo;
    case 'pg':
      console.error('Need implementation');

      break;
    default:
      console.error('Unknown client type');

      break;
  }
};
