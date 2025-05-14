import { PrismaClient } from "@prisma/client";

class TrackingServices {
  constructor() {
    this.prisma = new PrismaClient();
  }

  getAllTracking = () => {
    return this.prisma.tracking.findMany();
  };

  getTrackingByPackageId = (packageId) => {
    return this.prisma.tracking.findMany({
      where: {
        packageId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  };

  insertTracking = (data) => {
    return this.prisma.tracking.create({
      data,
    });
  };
}

export default new TrackingServices();
