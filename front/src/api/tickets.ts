import { handleFetch } from "./fetchHandler.js";


// Get all available events
async function getTickets() {
  return handleFetch({
    route: "/",
    method: "GET",
  }); 
}

// Buy a ticket
async function buyTicket({
  ticketId, 
  quantity,
}: {
  ticketId: string,
  quantity: number,
}) {
  return handleFetch({
    route: "/transaction/create",
    method: "POST",
    body: {
      ticketId: ticketId,
      quantity: quantity,
    },
  });
}

// Commit a transaction
async function commitTransaction({
  token,
}: {
  token: string,
}) {
  return handleFetch({
    route: "/transaction/commit",
    method: "POST",
    body: {
      ws_token: token,
    },
  });
}


export { getTickets, buyTicket, commitTransaction };