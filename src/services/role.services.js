import { PrismaClient } from "@prisma/client";

class RoleServices {
  constructor() {
    this.prisma = new PrismaClient();
  }

  createRole(data) {
    return this.prisma.roles.create({
      data,
    });
  }

  getRoles() {
    return this.prisma.roles.findMany();
  }

  getRoleById(id) {
    return this.prisma.roles.findUnique({
      where: {
        id: id,
      },
    });
  }

  getRoleByName(name) {
    return this.prisma.roles.findFirst({
      where: {
        name: name,
      },
    });
  }

  updateRole(id, data) {
    return this.prisma.roles.update({
      where: {
        id: id,
      },
      data,
    });
  }

  deleteRole(id) {
    return this.prisma.roles.delete({
      where: {
        id: id,
      },
    });
  }
}

export default new RoleServices();
