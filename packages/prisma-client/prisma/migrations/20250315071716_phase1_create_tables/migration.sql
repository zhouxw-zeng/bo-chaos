-- CreateTable
CREATE TABLE "UserDailyBehavior" (
    "openId" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "kowtowCount" INTEGER NOT NULL DEFAULT 0,
    "firstKowtowTime" TIMESTAMP(3),
    "lastKowtowTime" TIMESTAMP(3),

    CONSTRAINT "UserDailyBehavior_pkey" PRIMARY KEY ("openId","date")
);

-- CreateTable
CREATE TABLE "GlobalDailyStats" (
    "date" DATE NOT NULL,
    "totalKowtows" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "GlobalDailyStats_pkey" PRIMARY KEY ("date")
);

-- CreateIndex
CREATE INDEX "UserDailyBehavior_date_idx" ON "UserDailyBehavior"("date");

-- CreateIndex
CREATE INDEX "GlobalDailyStats_date_idx" ON "GlobalDailyStats"("date");

-- AddForeignKey
ALTER TABLE "UserDailyBehavior" ADD CONSTRAINT "UserDailyBehavior_openId_fkey" FOREIGN KEY ("openId") REFERENCES "User"("openId") ON DELETE RESTRICT ON UPDATE CASCADE;
