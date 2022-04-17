-- CreateEnum
CREATE TYPE "Prompt" AS ENUM ('LooksLike', 'WeNeed', 'Example', 'FreeForm');

-- CreateEnum
CREATE TYPE "Pattern" AS ENUM ('EdenDao', 'Interoperability', 'Agency', 'Regeneration', 'Privacy', 'Voice', 'EngagementAndAttention', 'MaintenanceAndCare', 'Commons');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "signature" TEXT NOT NULL,
    "twitterVerified" BOOLEAN NOT NULL DEFAULT false,
    "twitterUsername" TEXT,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "transactionId" TEXT,
    "disagrees" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contribution" (
    "id" SERIAL NOT NULL,
    "response" TEXT NOT NULL,
    "prompt" "Prompt" NOT NULL,
    "pattern" "Pattern" NOT NULL DEFAULT E'EdenDao',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "authorWalletId" TEXT NOT NULL,
    "rank" INTEGER NOT NULL DEFAULT 0,
    "country" TEXT NOT NULL,

    CONSTRAINT "Contribution_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Contribution" ADD CONSTRAINT "Contribution_authorWalletId_fkey" FOREIGN KEY ("authorWalletId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
