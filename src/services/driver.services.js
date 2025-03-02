import { PrismaClient } from "@prisma/client";

class DriverServices {
  constructor() {
    this.prisma = new PrismaClient();
  }

  getAllDrivers = () => {
    return this.prisma.drivers.findMany();
  };

  getDriverByEmail = (email) => {
    return this.prisma.users.findUnique({
      where: {
        email,
      },
    });
  };

  createDriver = (data) => {
    return this.prisma.drivers.create({
      data,
    });
  };
}

export default new DriverServices();
