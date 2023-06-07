/*
  Warnings:

  - You are about to drop the `CoAuthor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `authorAffId` on the `Paper` table. All the data in the column will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "CoAuthor";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "PaperAuthor" (
    "fname" TEXT NOT NULL,
    "lname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "paperId" INTEGER NOT NULL,
    "affilId" INTEGER NOT NULL,

    PRIMARY KEY ("email", "paperId"),
    CONSTRAINT "PaperAuthor_paperId_fkey" FOREIGN KEY ("paperId") REFERENCES "Paper" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PaperAuthor_affilId_fkey" FOREIGN KEY ("affilId") REFERENCES "Institution" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Paper" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "authorId" INTEGER NOT NULL,
    "abstract" TEXT NOT NULL,
    "presenter" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "sessionId" INTEGER,
    CONSTRAINT "Paper_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Author" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Paper_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Paper" ("abstract", "authorId", "id", "presenter", "sessionId", "status", "title") SELECT "abstract", "authorId", "id", "presenter", "sessionId", "status", "title" FROM "Paper";
DROP TABLE "Paper";
ALTER TABLE "new_Paper" RENAME TO "Paper";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
