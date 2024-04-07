/*
  Warnings:

  - You are about to drop the column `firstName` on the `form` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `form` table. All the data in the column will be lost.
  - Added the required column `firstName` to the `Question` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Question` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `form` DROP COLUMN `firstName`,
    DROP COLUMN `lastName`;

-- AlterTable
ALTER TABLE `question` ADD COLUMN `firstName` VARCHAR(191) NOT NULL,
    ADD COLUMN `lastName` VARCHAR(191) NOT NULL;
