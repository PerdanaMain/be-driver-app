import { PrismaClient } from "@prisma/client";

class PackageServices {
  constructor() {
    this.prisma = new PrismaClient();
  }

  getAllPackages() {
    return this.prisma.packages.findMany();
  }

  getPackage(id) {
    return this.prisma.packages.findUnique({
      where: {
        id,
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
