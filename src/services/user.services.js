import { PrismaClient } from "@prisma/client";

class UserServices {
  constructor() {
    this.prisma = new PrismaClient();
  }

  getUserByEmail(email) {
    return this.prisma.users.findFirst({
      where: {
        email,
      },
      include: {
        roles: {
          select: {
            id: true,
            name: true,
          },
        },
        driver: true, // Include the driver relation
      },
    });
  }

  createUser(data) {
    return this.prisma.users.create({
      data,
    });
  }
}

export default new UserServices();
