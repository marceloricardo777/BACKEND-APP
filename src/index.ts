import 'reflect-metadata';
import './config/env';
import { createConnection } from 'typeorm';
import express, { Request } from 'express';
import cors from 'cors';
import routes from './routes';
import 'reflect-metadata';
import * as path from 'path';
import morgan from 'morgan';
import fs from 'fs';
import moment from 'moment';
const app = express();

const corsOptions = {
  // origin: 'http://localhost:3333',
};

app.use(express.json());
morgan.token('id', function (req: Request) {
  try {
    return req.params.id;
  } catch {
    return '';
  }
})
morgan.token('idadmin', function (req: Request) {
  try {
    return req.params.idadmin;
  } catch {
    return '';
  }
})
morgan.token('idtran', function (req: Request) {
  try {
    return req.params.idtran;
  } catch {
    return '';
  }
})
morgan.token('data', function () { return moment().format('YYYY-MM-DD, h:mm:ss a') })


const log = fs.createWriteStream(
  path.join(__dirname, "./logs", `express${moment().format('YYYY-MM-DD')}.log`), { flags: "a" }
);

app.use(morgan(`:remote-addr - :remote-user IdAdmin: :idadmin IdTransaction: :idtran Id: :id Data: :data  :method :url :status`, { stream: log }))



app.use('/img', express.static(path.join(__dirname, "/img")));


app.use(cors(corsOptions));
createConnection();
app.use(express.urlencoded({ extended: true }));
app.use(routes);
app.listen(3333, () => console.log('Serve rodando porta 3333'));
