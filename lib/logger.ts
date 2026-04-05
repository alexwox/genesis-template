const LOG_LEVELS = ["trace", "debug", "info", "warn", "error", "fatal"] as const;

export type LogLevel = (typeof LOG_LEVELS)[number];

type LogMetadata = Record<string, unknown>;
type SerializedError = {
  name: string;
  message: string;
  stack: string | undefined;
  cause: unknown;
};

export type Logger = {
  level: LogLevel;
  child(context: LogMetadata): Logger;
  log(level: LogLevel, message: string, metadata?: LogMetadata): void;
  trace(message: string, metadata?: LogMetadata): void;
  debug(message: string, metadata?: LogMetadata): void;
  info(message: string, metadata?: LogMetadata): void;
  warn(message: string, metadata?: LogMetadata): void;
  error(message: string, metadata?: LogMetadata): void;
  fatal(message: string, metadata?: LogMetadata): void;
};

const LOG_LEVEL_PRIORITY: Record<LogLevel, number> = {
  trace: 10,
  debug: 20,
  info: 30,
  warn: 40,
  error: 50,
  fatal: 60,
};

function isLogLevel(value: string): value is LogLevel {
  return LOG_LEVELS.includes(value as LogLevel);
}

function getConfiguredLogLevel(): LogLevel {
  const rawLevel = process.env.LOG_LEVEL?.trim().toLowerCase();

  if (rawLevel && isLogLevel(rawLevel)) {
    return rawLevel;
  }

  return process.env.NODE_ENV === "development" ? "debug" : "info";
}

function shouldLog(messageLevel: LogLevel, configuredLevel: LogLevel) {
  return (
    LOG_LEVEL_PRIORITY[messageLevel] >= LOG_LEVEL_PRIORITY[configuredLevel]
  );
}

function serializeError(error: Error): SerializedError {
  return {
    name: error.name,
    message: error.message,
    stack: error.stack,
    cause: error.cause instanceof Error ? serializeError(error.cause) : error.cause,
  };
}

function normalizeMetadata(metadata: LogMetadata | undefined): LogMetadata {
  if (!metadata) {
    return {};
  }

  return Object.fromEntries(
    Object.entries(metadata).map(([key, value]) => {
      if (value instanceof Error) {
        return [key, serializeError(value)];
      }

      return [key, value];
    })
  );
}

function getConsoleMethod(level: LogLevel): "debug" | "info" | "warn" | "error" {
  switch (level) {
    case "trace":
    case "debug":
      return "debug";
    case "info":
      return "info";
    case "warn":
      return "warn";
    case "error":
    case "fatal":
      return "error";
  }
}

function writeToConsole(level: LogLevel, entry: LogMetadata) {
  switch (getConsoleMethod(level)) {
    case "debug":
      // eslint-disable-next-line no-console
      { console.debug(entry); return; }
    case "info":
      // eslint-disable-next-line no-console
      { console.info(entry); return; }
    case "warn":
      // eslint-disable-next-line no-console
      { console.warn(entry); return; }
    case "error":
      // eslint-disable-next-line no-console
      { console.error(entry); return; }
  }
}

export function createLogger(
  context: LogMetadata = {},
  configuredLevel = getConfiguredLogLevel()
): Logger {
  const baseContext = normalizeMetadata(context);

  const write = (level: LogLevel, message: string, metadata?: LogMetadata) => {
    if (!shouldLog(level, configuredLevel)) {
      return;
    }

    writeToConsole(level, {
      timestamp: new Date().toISOString(),
      level,
      message,
      ...baseContext,
      ...normalizeMetadata(metadata),
    });
  };

  return {
    level: configuredLevel,
    child(childContext: LogMetadata) {
      return createLogger(
        {
          ...baseContext,
          ...normalizeMetadata(childContext),
        },
        configuredLevel
      );
    },
    log: write,
    trace(message, metadata) {
      write("trace", message, metadata);
    },
    debug(message, metadata) {
      write("debug", message, metadata);
    },
    info(message, metadata) {
      write("info", message, metadata);
    },
    warn(message, metadata) {
      write("warn", message, metadata);
    },
    error(message, metadata) {
      write("error", message, metadata);
    },
    fatal(message, metadata) {
      write("fatal", message, metadata);
    },
  };
}

export const logger = createLogger();
