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

  getOrderById = (id) => {
    return this.prisma.orders.findUnique({
      where: {
        id,
      },
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

  updateOrder = (id, data) => {
    return this.prisma.orders.update({
      where: {
        id,
      },
      data,
    });
  };

  deleteOrder = (id) => {
    return this.prisma.orders.delete({
      where: {
        id,
      },
    });
  };
}

export default new OrderServices();
