/*
  Warnings:

  - Added the required column `plano` to the `Lojas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Lojas` ADD COLUMN `plano` VARCHAR(255) NOT NULL;
