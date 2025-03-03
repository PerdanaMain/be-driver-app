import { PrismaClient } from "@prisma/client";

class DriverServices {
  constructor() {
    this.prisma = new PrismaClient();
  }

  getAllDrivers = () => {
    return this.prisma.drivers.findMany();
  };

  getDriverById = (id) => {
    return this.prisma.drivers.findUnique({
      where: {
        id,
      },
    });
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

  updateDriver = (id, data) => {
    return this.prisma.drivers.update({
      where: {
        id,
      },
      data,
    });
  };
}

export default new DriverServices();
