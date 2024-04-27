/*
  Warnings:

  - A unique constraint covering the columns `[tinyUrl]` on the table `Url` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Url_tinyUrl_key" ON "Url"("tinyUrl");
