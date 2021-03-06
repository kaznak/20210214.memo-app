-- CreateTable
CREATE TABLE "Memo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "text" TEXT NOT NULL,
    "memoId" INTEGER,
    FOREIGN KEY ("memoId") REFERENCES "Memo" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
