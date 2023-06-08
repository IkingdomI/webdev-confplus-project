-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Review" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "evaluation" INTEGER,
    "contribution" INTEGER,
    "strength" TEXT NOT NULL,
    "weakness" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
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
