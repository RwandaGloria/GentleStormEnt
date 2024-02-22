import express from 'express';
import dotenv from 'dotenv';
import winston, { Logger } from 'winston';
import * as mkdirp from 'mkdirp';
import dbConnect from './db/db';
import * as expressSession from 'express-session';
import * as keyCloak from 'keycloak-connect';

dotenv.config();
const PORT = 3902;
const app = express();

let logger: Logger;
// Create a directory named 'logs'
mkdirp.mkdirp('/logs')
  .then(() => {
    // Initialize logger inside the then block
    logger = winston.createLogger({
      transports: [
        new winston.transports.File({
          filename: 'logs/combined.log',
          level: 'info'
        }),
        new winston.transports.File({
          filename: 'logs/errors.log',
          level: 'error'
        }),
        new winston.transports.Console()
      ]
    });
    app.listen(PORT, () => {
      // Check if logger is initialized before logging
      if (!logger) {
        console.error('Logger is not initialized!');
        return;
      }
      logger.log('info', { message: `Server Started Successfully at ${PORT} at ${new Date().toLocaleString()}` });
      dbConnect();
    });
  })
  .catch((err) => {
    console.error('Error creating logs directory:', err);
    process.exit(1); // Terminate the process if directory creation fails
  });

// Export the logger as a named export
export { logger };
