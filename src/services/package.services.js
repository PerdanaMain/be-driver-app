import { PrismaClient } from "@prisma/client";

class PackageServices {
  constructor() {
    this.prisma = new PrismaClient();
  }

  getAllPackages() {
    return this.prisma.packages.findMany({
      select: {
        id: true,
        status: true,
        Receiver: true,
        Sender: true,
      },
    });
  }

  getPackage(id) {
    return this.prisma.packages.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        status: true,
        Receiver: true,
        Sender: true,
      },
    });
  }

  createPackage(data) {
    return this.prisma.packages.create({
      data,
    });
  }

  updatePackage(id, data) {
    return this.prisma.packages.update({
      where: {
        id,
      },
      data,
      include: {
        Receiver: true,
        Sender: true,
      },
    });
  }

  deletePackage(id) {
    return this.prisma.packages.delete({
      where: {
        id,
      },
    });
  }
}

export default new PackageServices();
