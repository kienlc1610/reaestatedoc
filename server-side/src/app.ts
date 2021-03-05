import 'reflect-metadata';
import { createConnection } from 'typeorm';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import routes from './routes';
import errorhandlerMiddleware from './middlewares/errorhandler.middleware';

createConnection()
  .then(() => {
    console.log('DB is connected');
    // create express app
    const app = express();

    app.use(bodyParser.json());

    app.get('/', (req, res) => {
      res.send('Work!');
    });

    app.use('/api', routes());
    app.use(errorhandlerMiddleware);

    process.on('uncaughtException', (err) => {
      console.error(err, 'uncaughtException');
      process.exit();
    });

    process.on('beforeExit', () => {
      console.info('DB connection is closed!');
      console.info('Exit!!!');
    });

    process.on('SIGINT', () => {
      console.info('Exit app through ctrl+c event');
      process.exit();
    });

    app.listen(3000, () => {
      console.log('Express server has started on port 3000.');
    });
  })
  .catch((error) => console.log(error));
