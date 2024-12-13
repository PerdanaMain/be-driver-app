import { PrismaClient } from "@prisma/client";

class PackageServices {
  constructor() {
    this.prisma = new PrismaClient();
  }

  async getAllPackages() {
    return this.prisma.packages.findMany();
  }
}

export default new PackageServices();
