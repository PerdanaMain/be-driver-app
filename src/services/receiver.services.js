import { PrismaClient } from "@prisma/client";

class ReceiverServices {
  constructor() {
    this.prisma = new PrismaClient();
  }

  async getReceivers() {
    return this.prisma.receivers.findMany();
  }

  async getReceiver(id) {
    return this.prisma.receivers.findUnique({
      where: {
        id: parseInt(id),
      },
    });
  }
}

export default new ReceiverServices();
