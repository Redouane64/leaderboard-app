import { randomUUID } from 'crypto';
import { LoggerModuleAsyncParams, Params } from 'nestjs-pino';
import pino from 'pino';
import * as pretty from 'pino-pretty';

export const loggerModuleOptions: LoggerModuleAsyncParams = {
  inject: [],
  useFactory: (): Params => {
    const targets: pino.TransportTargetOptions<Record<string, any>>[] = [
      {
        target: 'pino-pretty',
        level: 'debug',
        options: {
          colorize: true,
          ignore: 'pid,hostname',
          destination: 'log.txt',
          sync: false,
        },
      },
    ];

    return {
      exclude: ['/healthz', '/swagger', '/favicon.ico'],
      pinoHttp: {
        transport: {
          targets,
        },
        genReqId: () => randomUUID(),
      },
    };
  },
};
