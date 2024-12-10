import { PrismaClient } from "@prisma/client";

class Database {
  constructor() {
    if (Database.instance) {
      return Database.instance;
    }

    this.prisma = new PrismaClient({
      log: ["query", "info", "warn", "error"],
      errorFormat: "pretty",
    });

    // handle disconnect
    process.on("beforeExit", async () => {
      await this.$disconnect();
    });

    Database.instance = this;
  }

  getInstances() {
    return this.prisma;
  }

  async connect() {
    try {
      await this.prisma.$connect();
      console.log("Database connected");
      return true;
    } catch (error) {
      console.error("Database connection error", error);
      throw error;
    }
  }

  async $disconnect() {
    try {
      await this.prisma.$disconnect();
      console.log("Database disconnected");
    } catch (error) {
      console.error("Database disconnect error", error);
      throw error;
    }
  }
}

export default new Database();
