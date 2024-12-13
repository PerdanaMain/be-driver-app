import { PrismaClient } from "@prisma/client";

class PackageServices {
  constructor() {
    this.prisma = new PrismaClient();
  }

  async getAllPackages() {
    return this.prisma.packages.findMany({
      select: {
        id: true,
        status: true,
        Receiver: true,
        Sender: true,
      },
    });
  }

  async createPackage(data) {
    return this.prisma.packages.create({
      data,
    });
  }
}

export default new PackageServices();
