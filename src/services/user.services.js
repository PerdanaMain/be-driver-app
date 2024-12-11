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
        Roles: {
          select: {
            id: true,
            name: true,
          },
        },
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
