import * as express from 'express';
import * as bodyParser from 'body-parser';
// import cors from 'cors';
import { connectToDb } from './database';
import router from './router';
import * as config from './config.json';

const app = express();

// app.use(cors());
// app.options('*', cors);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/rest', router);

app.listen(config.PORT, () => {
  connectToDb();
  console.log(`INNKEEPER Server listening at port ${config.PORT}!`);
});
