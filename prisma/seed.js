import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.roles.createMany({
    data: [
      {
        name: "admin",
      },
      {
        name: "drive",
      },
      {
        name: "customer",
      },
    ],
  });

  await prisma.senders.createMany({
    data: [
      {
        name: "ITS",
        phone: "0822222222",
        address: "Jl. Raya ITS",
        latitude:"92.1516163161",
        longitude:"-215.2515212"
      },
      {
        name: "UB",
        phone: "0811111111",
        address: "Jl. Raya UB",
        latitude:"92.1516163161",
        longitude:"-215.2515212"
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
