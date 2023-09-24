import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function seed() {

  await db.ticket.create({
    data: {
      name: "Taylor Swift Chile 2023",
      description: "Concierto de Taylor Swift en Chile #2023",
      type: "Concierto",
      price: 400,
    }
  });

  await db.ticket.create({
    data: {
      name: "Festival Viña del Mar 2024",
      description: "Entrada para todas la noches del maravilloso festival de Viña del Mar #2024",
      type: "Festival",
      price: 50,
    }
  });

  await db.ticket.create({
    data: {
      name: "Luis Miguel Chile 2026",
      description: "Compra tu entrada para el concierto de Luis Miguel en Chile #2026",
      type: "Concierto",
      price: 10,
    }
  });
  
}

await seed();