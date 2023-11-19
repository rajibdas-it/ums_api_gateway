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
});

const envVariable = envVariableZodSchema.parse(process.env);

export const config = {
  node_env: envVariable.NODE_ENV,
  port: envVariable.PORT,
  redis: {
    url: envVariable.REDIS_URL,
  },
  authServiceUrl: envVariable.AUTH_SERVICE_URL,
  coreServiceUrl: envVariable.CORE_SERVICE_URL,
};
