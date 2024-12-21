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

  getSenderByName(name) {
    return this.prisma.senders.findFirst({
      where: {
        name: {
          contains: name,
          mode: "insensitive",
        },
      },
    });
  }

  createSender(data) {
    return this.prisma.senders.create({
      data,
    });
  }

  updateSender(id, data) {
    return this.prisma.senders.update({
      where: {
        id,
      },
      data,
    });
  }

  deleteSender(id) {
    return this.prisma.senders.delete({
      where: {
        id,
      },
    });
  }
}

export default new SenderServices();
