import { PrismaClient } from "@prisma/client";

class SenderServices {
  constructor() {
    this.prisma = new PrismaClient();
  }

  getSenders() {
    return this.prisma.senders.findMany();
  }

  getSender() {
    return this.prisma.senders.findUnique({
      where: {
        id: parseInt(id),
      },
    });
  }
}

export default new SenderServices();
