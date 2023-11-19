import { Server } from 'http';
import app from './app';
import { config } from './config';
import { errorLogger, infoLogger } from './shared/logger';
import { RedisClient } from './shared/redis';

let server: Server;

async function apiGatewasyServer() {
  await RedisClient.connect();
  server = app.listen(config.port, () => {
    infoLogger.info(`Server Running On Port ${config.port}`);
  });

  const exitHandler = () => {
    if (server) {
      server.close(() => {
        infoLogger.info('server close');
        process.exit(1);
      });
    }
    process.exit(1);
  };

  const unexprectedErrorHandler = (error: unknown) => {
    errorLogger.error(error);
    exitHandler();
  };

  process.on('uncaughtException', unexprectedErrorHandler);
  process.on('unhandledRejection', unexprectedErrorHandler);

  process.on('SIGTERM', () => {
    infoLogger.info('Sigterm is received');
    if (server) {
      server.close();
    }
  });
}
apiGatewasyServer();
