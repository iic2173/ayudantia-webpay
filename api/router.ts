import Router from 'koa-router';
import { trxRouter } from '@routes/transaction';
import { db } from '@utils/db';

const router = new Router();

router.use('/transaction', trxRouter.routes());
router.get('/', async (ctx) => {
  const tickets = await db.ticket.findMany();
  ctx.body = {
    tickets
  };
});

export { router }