import Router from 'koa-router';
import { tx } from '@utils/trx';
import { db } from '@utils/db';



const trxRouter = new Router();

trxRouter.post('/create', async (ctx) => {
  try {
    const { ticketId, quantity } = ctx.request.body;
    const ticket = await db.ticket.findUnique({
      where: {
        id: ticketId,
      }
    });
    if (!ticket) {
      ctx.body = {
        message: "Ticket no encontrado"
      };
      ctx.status = 404;
      return;
    }
    const amount = ticket.price * Number(quantity);
     const newTrx = await db.transaction.create({
      data: {
        ticket: {
          connect: {
            id: ticketId,
          }
        },
        quantity,
        amount,
        status: "pending"
      }
    });
    // // USO: tx.create(transactionId, nombreComercio, monto, urlRetorno)
    const trx = await tx.create(newTrx.id, "test-iic2173", amount, process.env?.REDIRECT_URL || "http://localhost:8000/completed-purchase");
    await db.transaction.update({
      where: {
        id: newTrx.id
      },
      data: {
        token: trx.token,
      }
    });
     ctx.body = trx;
     ctx.status = 201;
  } catch (e) {
    console.log(e);
  }
  return;
});

trxRouter.post('/commit', async (ctx) => {
  const { ws_token } = ctx.request.body;
  if (!ws_token || ws_token == "") {
    ctx.body = {
      message: "Transaccion anulada por el usuario"
    };
    ctx.status = 200;
    return;
  }
  const confirmedTx = await tx.commit(ws_token);

  if (confirmedTx.response_code != 0) { // Rechaza la compra
    const trx = await db.transaction.update({
      where: {
        token: ws_token
      },
      data: {
        status: "rejected"
      },
      select: {
        ticket: {
          select: {
            name: true,
            type: true,
          }
        },
        quantity: true,
        amount: true
      }
    });
    ctx.body = {
      message: "Transaccion ha sido rechazada",
      ticket: trx.ticket,
      quantity: trx.quantity

    };
    ctx.status = 200;
    return;
  }
  const trx = await db.transaction.update({
    where: {
      token: ws_token
    },
    data: {
      status: "completed"
    }, 
    select: {
      ticket: {
        select: {
          name: true,
          type: true,
        }
      },
      quantity: true,
      amount: true
    }
    
  });

  ctx.status = 200;
  ctx.body = {
    message: "Transaccion ha sido aceptada",
    ticket: trx.ticket,
    quantity: trx.quantity
  };
  return;
});


export { trxRouter };