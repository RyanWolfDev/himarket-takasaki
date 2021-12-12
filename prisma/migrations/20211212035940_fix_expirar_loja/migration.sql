/*
  Warnings:

  - You are about to alter the column `expirar` on the `Lojas` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `BigInt`.

*/
-- AlterTable
ALTER TABLE `Lojas` MODIFY `expirar` BIGINT NOT NULL;
