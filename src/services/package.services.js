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
        receiver: true,
        sender: true,
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
        receiver: true,
        sender: true,
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
        receiver: true,
        sender: true,
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

  deleteAllPackage() {
    return this.prisma.packages.deleteMany();
  }
}

export default new PackageServices();
