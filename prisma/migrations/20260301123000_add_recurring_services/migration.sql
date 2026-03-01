CREATE TABLE "RecurringService" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "isPaid" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "RecurringService_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "RecurringService_userId_idx" ON "RecurringService"("userId");
CREATE INDEX "RecurringService_dueDate_idx" ON "RecurringService"("dueDate");

ALTER TABLE "RecurringService"
ADD CONSTRAINT "RecurringService_userId_fkey"
FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
