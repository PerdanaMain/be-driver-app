import { PrismaClient } from "@prisma/client";

class SenderServices {
  constructor() {
    this.prisma = new PrismaClient();
  }

  getSenders() {
    return this.prisma.senders.findMany();
  }

  getSender(id) {
    return this.prisma.senders.findUnique({
      where: {
        id,
      },
    });
  }
}

export default new SenderServices();
