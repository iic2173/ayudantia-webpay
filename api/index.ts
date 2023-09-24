import Koa from 'koa';
import logger from 'koa-logger';
import koaBody from 'koa-body';
import cors from '@koa/cors';

import { router } from './router';

const corsOptions = {
  origin: '*',
  credentials: true,
//  allowMethods: ["GET", "POST", "OPTIONS"],
//  allowHeaders: ["Authorization", "Content-Type", "X-Custom-Header", "Origin", "Accept"]
};

const app = new Koa();

app.use(cors(corsOptions));
app.use(logger());
app.use(koaBody());

app.use(router.routes());


app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Server is running...');
});
