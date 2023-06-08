/*
  Warnings:

  - You are about to drop the column `status` on the `Session` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Session" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "organizerId" INTEGER NOT NULL,
    "locID" INTEGER NOT NULL,
    "dateID" INTEGER NOT NULL,
    "timeID" INTEGER NOT NULL,
    CONSTRAINT "Session_organizerId_fkey" FOREIGN KEY ("organizerId") REFERENCES "Organizer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Session_locID_fkey" FOREIGN KEY ("locID") REFERENCES "Location" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Session_dateID_fkey" FOREIGN KEY ("dateID") REFERENCES "Condates" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Session_timeID_fkey" FOREIGN KEY ("timeID") REFERENCES "Time" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Session" ("dateID", "id", "locID", "organizerId", "timeID", "title") SELECT "dateID", "id", "locID", "organizerId", "timeID", "title" FROM "Session";
DROP TABLE "Session";
ALTER TABLE "new_Session" RENAME TO "Session";
CREATE UNIQUE INDEX "Session_title_key" ON "Session"("title");
CREATE UNIQUE INDEX "Session_dateID_timeID_locID_key" ON "Session"("dateID", "timeID", "locID");
CREATE TABLE "new_Paper" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "authorId" INTEGER NOT NULL,
    "abstract" TEXT NOT NULL,
    "presenter" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "sessionId" INTEGER,
    CONSTRAINT "Paper_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Author" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Paper_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Paper" ("abstract", "authorId", "id", "presenter", "sessionId", "status", "title") SELECT "abstract", "authorId", "id", "presenter", "sessionId", "status", "title" FROM "Paper";
DROP TABLE "Paper";
ALTER TABLE "new_Paper" RENAME TO "Paper";
CREATE TABLE "new_Review" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "evaluation" INTEGER,
    "contribution" INTEGER,
    "strength" TEXT NOT NULL,
    "weakness" TEXT NOT NULL,
    "reviewerID" INTEGER NOT NULL,
    "paperId" INTEGER NOT NULL,
    CONSTRAINT "Review_reviewerID_fkey" FOREIGN KEY ("reviewerID") REFERENCES "Reviewer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Review_paperId_fkey" FOREIGN KEY ("paperId") REFERENCES "Paper" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Review" ("contribution", "evaluation", "id", "paperId", "reviewerID", "strength", "weakness") SELECT "contribution", "evaluation", "id", "paperId", "reviewerID", "strength", "weakness" FROM "Review";
DROP TABLE "Review";
ALTER TABLE "new_Review" RENAME TO "Review";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
