import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  await prisma.roles.createMany({
    data: [
      {
        name: "Admin",
      },
      {
        name: "Customer",
      },
      {
        name: "Driver",
      },
    ],
  });

  const role = await prisma.roles.findFirst({
    where: {
      name: "Admin",
    },
  });

  await prisma.users.create({
    data: {
      email: "admin@admin",
      password: bcrypt.hashSync("admin", 10),
      roleId: role?.id,
    },
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
