-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "role" TEXT,
    "password" TEXT,
    "studentId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_userId_key" ON "users"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "users_studentId_key" ON "users"("studentId");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
