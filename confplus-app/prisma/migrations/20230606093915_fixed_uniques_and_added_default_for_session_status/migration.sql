-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Session" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'not approved',
    "organizerId" INTEGER NOT NULL,
    "locID" INTEGER NOT NULL,
    "dateID" INTEGER NOT NULL,
    "timeID" INTEGER NOT NULL,
    CONSTRAINT "Session_organizerId_fkey" FOREIGN KEY ("organizerId") REFERENCES "Organizer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Session_locID_fkey" FOREIGN KEY ("locID") REFERENCES "Location" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Session_dateID_fkey" FOREIGN KEY ("dateID") REFERENCES "Condates" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Session_timeID_fkey" FOREIGN KEY ("timeID") REFERENCES "Time" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Session" ("dateID", "id", "locID", "organizerId", "status", "timeID", "title") SELECT "dateID", "id", "locID", "organizerId", "status", "timeID", "title" FROM "Session";
DROP TABLE "Session";
ALTER TABLE "new_Session" RENAME TO "Session";
CREATE UNIQUE INDEX "Session_title_key" ON "Session"("title");
CREATE UNIQUE INDEX "Session_dateID_timeID_locID_key" ON "Session"("dateID", "timeID", "locID");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
