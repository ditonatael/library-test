/*
  Warnings:

  - A unique constraint covering the columns `[book_title]` on the table `borrowedBook` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `borrowedBook_book_title_key` ON `borrowedBook`(`book_title`);
