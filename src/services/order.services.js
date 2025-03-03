import { PrismaClient } from "@prisma/client";

class OrderServices {
  constructor() {
    this.prisma = new PrismaClient();
  }
  getAllOrder = () => {
    return this.prisma.orders.findMany({
      include: {
        packages: true,
        drivers: true,
      },
    });
  };

  getExistingOrder = (packageId) => {
    return this.prisma.orders.findFirst({
      where: {
        packageId,
      },
    });
  };

  createOrder = (data) => {
    return this.prisma.orders.create({
      data,
    });
  };
}

export default new OrderServices();
