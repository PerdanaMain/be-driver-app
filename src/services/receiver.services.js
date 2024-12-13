import { PrismaClient } from "@prisma/client";

class ReceiverServices {
  constructor() {
    this.prisma = new PrismaClient();
  }

  getReceivers() {
    return this.prisma.receivers.findMany();
  }

  getReceiver(id) {
    return this.prisma.receivers.findUnique({
      where: {
        id: parseInt(id),
      },
    });
  }
}

export default new ReceiverServices();
