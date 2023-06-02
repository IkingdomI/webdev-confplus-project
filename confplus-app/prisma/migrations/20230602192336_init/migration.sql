-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Time" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "time" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Organizer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    CONSTRAINT "Organizer_id_fkey" FOREIGN KEY ("id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Paper" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "authorId" INTEGER NOT NULL,
    "authorAffId" INTEGER NOT NULL,
    "abstract" TEXT NOT NULL,
    "presenter" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "sessionId" INTEGER NOT NULL,
    CONSTRAINT "Paper_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "Author" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Paper_authorAffId_fkey" FOREIGN KEY ("authorAffId") REFERENCES "Institution" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Paper_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CoAuthor" (
    "fname" TEXT NOT NULL,
    "lname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "paperId" INTEGER NOT NULL,
    "affilId" INTEGER NOT NULL,

    PRIMARY KEY ("email", "paperId"),
    CONSTRAINT "CoAuthor_paperId_fkey" FOREIGN KEY ("paperId") REFERENCES "Paper" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CoAuthor_affilId_fkey" FOREIGN KEY ("affilId") REFERENCES "Institution" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Author" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    CONSTRAINT "Author_id_fkey" FOREIGN KEY ("id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Reviewer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    CONSTRAINT "Reviewer_id_fkey" FOREIGN KEY ("id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Review" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "evaluation" INTEGER NOT NULL,
    "contribution" INTEGER NOT NULL,
    "strength" TEXT NOT NULL,
    "weakness" TEXT NOT NULL,
    "reviewerID" INTEGER NOT NULL,
    "paperId" INTEGER NOT NULL,
    CONSTRAINT "Review_reviewerID_fkey" FOREIGN KEY ("reviewerID") REFERENCES "Reviewer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Review_paperId_fkey" FOREIGN KEY ("paperId") REFERENCES "Paper" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Session" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "organizerId" INTEGER NOT NULL,
    "locID" INTEGER NOT NULL,
    "dateID" INTEGER NOT NULL,
    "timeID" INTEGER NOT NULL,
    CONSTRAINT "Session_organizerId_fkey" FOREIGN KEY ("organizerId") REFERENCES "Organizer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Session_locID_fkey" FOREIGN KEY ("locID") REFERENCES "Location" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Session_dateID_fkey" FOREIGN KEY ("dateID") REFERENCES "Condates" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Session_timeID_fkey" FOREIGN KEY ("timeID") REFERENCES "Time" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Location" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "value" TEXT NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Institution" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "value" TEXT NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Condates" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "PDF" (
    "name" TEXT NOT NULL PRIMARY KEY,
    "content" BLOB NOT NULL,
    "paperId" INTEGER NOT NULL,
    CONSTRAINT "PDF_paperId_fkey" FOREIGN KEY ("paperId") REFERENCES "Paper" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Time_time_key" ON "Time"("time");

-- CreateIndex
CREATE UNIQUE INDEX "Session_title_key" ON "Session"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Session_dateID_timeID_key" ON "Session"("dateID", "timeID");

-- CreateIndex
CREATE UNIQUE INDEX "Location_value_key" ON "Location"("value");

-- CreateIndex
CREATE UNIQUE INDEX "Institution_value_key" ON "Institution"("value");

-- CreateIndex
CREATE UNIQUE INDEX "Condates_date_key" ON "Condates"("date");

-- CreateIndex
CREATE UNIQUE INDEX "PDF_paperId_key" ON "PDF"("paperId");
