-- CreateTable
CREATE TABLE "SchedaGeneration" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "muscleGroupIds" TEXT[],
    "trial" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SchedaGeneration_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SchedaGeneration_userId_idx" ON "SchedaGeneration"("userId");

-- AddForeignKey
ALTER TABLE "SchedaGeneration" ADD CONSTRAINT "SchedaGeneration_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
