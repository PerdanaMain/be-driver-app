/*
  Warnings:

  - You are about to drop the column `receiverId` on the `packages` table. All the data in the column will be lost.
  - You are about to drop the column `senderId` on the `packages` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `receivers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `senders` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `price` to the `packages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `receiver_address` to the `packages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `receiver_name` to the `packages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `receiver_phone` to the `packages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sender_address` to the `packages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sender_name` to the `packages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sender_phone` to the `packages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weight` to the `packages` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "packages" DROP CONSTRAINT "packages_receiverId_fkey";

-- DropForeignKey
ALTER TABLE "packages" DROP CONSTRAINT "packages_senderId_fkey";

-- AlterTable
ALTER TABLE "packages" DROP COLUMN "receiverId",
DROP COLUMN "senderId",
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "receiver_address" TEXT NOT NULL,
ADD COLUMN     "receiver_latitude" TEXT,
ADD COLUMN     "receiver_longitude" TEXT,
ADD COLUMN     "receiver_name" TEXT NOT NULL,
ADD COLUMN     "receiver_phone" TEXT NOT NULL,
ADD COLUMN     "sender_address" TEXT NOT NULL,
ADD COLUMN     "sender_latitude" TEXT,
ADD COLUMN     "sender_longitude" TEXT,
ADD COLUMN     "sender_name" TEXT NOT NULL,
ADD COLUMN     "sender_phone" TEXT NOT NULL,
ADD COLUMN     "weight" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "name";

-- DropTable
DROP TABLE "receivers";

-- DropTable
DROP TABLE "senders";

-- CreateTable
CREATE TABLE "drivers" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "vehicle_number" TEXT NOT NULL,
    "vehicle_type" TEXT NOT NULL,
    "isAssigned" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT false,
    "orderAmounts" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "drivers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" TEXT NOT NULL,
    "packageId" TEXT NOT NULL,
    "driverId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL,
    "startedAt" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "proofImage" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tracking" (
    "id" TEXT NOT NULL,
    "packageId" TEXT NOT NULL,
    "driverId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "latitude" TEXT NOT NULL,
    "longitude" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tracking_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "drivers" ADD CONSTRAINT "drivers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "drivers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "packages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tracking" ADD CONSTRAINT "tracking_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "drivers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tracking" ADD CONSTRAINT "tracking_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "packages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
