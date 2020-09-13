import * as express from 'express';
import * as bodyParser from 'body-parser';
// import cors from 'cors';
import router from './router';

const config = {
  PORT: 6668,
};

const app = express();

// app.use(cors());
// app.options('*', cors);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/rest', router);

app.listen(config.PORT, () =>
  console.log(`INNKEEPER Server listening at port ${config.PORT}!`),
);
