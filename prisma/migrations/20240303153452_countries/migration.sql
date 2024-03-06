-- CreateTable
CREATE TABLE "Countries" (
    "name" TEXT NOT NULL,
    "id" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Countries_name_key" ON "Countries"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Countries_id_key" ON "Countries"("id");
