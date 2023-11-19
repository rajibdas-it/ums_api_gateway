/* eslint-disable prefer-const */
import { createClient } from 'redis';
import { config } from '../config';
import { errorLogger, infoLogger } from './logger';

let redisClient = createClient({
  url: config.redis.url,
});

redisClient.on('error', err => errorLogger.error('RedisError', err));
redisClient.on('connect', () => infoLogger.info('Redis Connected'));

const connect = async () => {
  await redisClient.connect();
};

export const RedisClient = {
  connect,
};
