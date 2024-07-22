import pino from "pino";

const pinoConfig = pino({
  level: "info",
  browser: {
    asObject: true,
  },
  timestamp: () => new Date().toLocaleString(),
});

export const logger = {
  info: (message: any) => pinoConfig.info({ message }),
  error: (errMessage: any) => pinoConfig.error({ errMessage }),
};
