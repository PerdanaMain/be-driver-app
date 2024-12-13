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

  getReceiverByName(name) {
    return this.prisma.receivers.findFirst({
      where: {
        name: {
          contains: name,
          mode: "insensitive",
        },
      },
    });
  }

  create(data) {
    return this.prisma.receivers.create({
      data,
    });
  }
}

export default new ReceiverServices();
