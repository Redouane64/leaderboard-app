import { randomUUID } from 'crypto';
import { LoggerModuleAsyncParams, Params } from 'nestjs-pino';
import pino from 'pino';

export const loggerModuleOptions: LoggerModuleAsyncParams = {
  inject: [],
  useFactory: (): Params => {
    const targets: pino.TransportTargetOptions<Record<string, any>>[] = [
      {
        target: 'pino/file',
        options: {
          destination: `./app.log`,
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
        redact: ['req.headers.authorization'],
      },
    };
  },
};
