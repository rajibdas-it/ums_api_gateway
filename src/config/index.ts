import dotenv from 'dotenv';
import path from 'path';
import { z } from 'zod';

dotenv.config({ path: path.join(process.cwd(), '.env') });

const envVariableZodSchema = z.object({
  NODE_ENV: z.string(),
  PORT: z
    .string()
    .default('5000')
    .refine(portNum => Number(portNum)),
  REDIS_URL: z.string(),
  AUTH_SERVICE_URL: z.string(),
  CORE_SERVICE_URL: z.string(),
  ACCESS_TOKEN: z.string(),
  ACCESS_TOKEN_EXPIRES_IN: z.string(),
  REFRESH_TOKEN: z.string(),
  REFRESH_TOKEN_EXPIRES_IN: z.string(),
});

const envVariable = envVariableZodSchema.parse(process.env);

export const config = {
  node_env: envVariable.NODE_ENV,
  port: envVariable.PORT,
  jwt: {
    access_token: process.env.ACCESS_TOKEN,
    access_token_expires_in: process.env.ACCESS_TOKEN_EXPIRES_IN,
    refresh_token: process.env.REFRESH_TOKEN,
    refresh_token_expires_in: process.env.REFRESH_TOKEN_EXPIRES_IN,
  },
  redis: {
    url: envVariable.REDIS_URL,
  },
  authServiceUrl: envVariable.AUTH_SERVICE_URL,
  coreServiceUrl: envVariable.CORE_SERVICE_URL,
};
