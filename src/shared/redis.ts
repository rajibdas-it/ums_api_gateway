/* eslint-disable prefer-const */
import { createClient } from 'redis';
import { errorLogger, infoLogger } from './logger';

let redisClient = createClient({
  url: 'redis://localhost:6379',
});

redisClient.on('error', err => errorLogger.error('RedisError', err));
redisClient.on('connect', () => infoLogger.info('Redis Connected'));

const connect = async () => {
  await redisClient.connect();
};

export const RedisClient = {
  connect,
};
