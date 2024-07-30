/*
  Warnings:

  - You are about to drop the column `book` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `endBorrowDate` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `startBorrowDate` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `users` DROP COLUMN `book`,
    DROP COLUMN `endBorrowDate`,
    DROP COLUMN `startBorrowDate`;

-- CreateTable
CREATE TABLE `borrowedBook` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `book_title` VARCHAR(191) NOT NULL,
    `user` VARCHAR(191) NOT NULL,
    `start_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `end_date` DATETIME(3) NOT NULL,
    `status` ENUM('Returned', 'Past_Date', 'Borrowed') NOT NULL DEFAULT 'Borrowed',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
