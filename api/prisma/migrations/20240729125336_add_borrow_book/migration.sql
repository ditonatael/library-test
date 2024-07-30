/*
  Warnings:

  - Added the required column `endBorrowDate` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `users` ADD COLUMN `book` VARCHAR(191) NULL,
    ADD COLUMN `endBorrowDate` DATETIME(3) NOT NULL,
    ADD COLUMN `startBorrowDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
