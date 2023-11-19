import dotenv from 'dotenv';
import path from 'path';
import { z } from 'zod';

dotenv.config({ path: path.join(process.cwd(), '.env') });

const envVariableZodSchema = z.object({
  NODE_ENV: z.string(),
  PORT: z
    .string()
    .default('3030')
    .refine(portNum => Number(portNum)),
});

const envVariable = envVariableZodSchema.parse(process.env);

export const config = {
  node_env: envVariable.NODE_ENV,
  port: envVariable.PORT,
};
