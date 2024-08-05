import pino from "pino";

const pinoConfig = pino({
  level: "info",
  browser: {
    asObject: true,
  },
  timestamp: () => new Date().toLocaleString(),
});

export const logger = {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  info: (message: any) => pinoConfig.info({ message }),
  error: (errMessage: any) => pinoConfig.error({ errMessage }),
  /* eslint-enable @typescript-eslint/no-explicit-any */
};
