-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('ADM', 'Basic');

-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('Sale', 'Purchase');

-- CreateTable
CREATE TABLE "User" (
    "IdUser" SERIAL NOT NULL,
    "Login" TEXT NOT NULL,
    "Password" TEXT NOT NULL,
    "UserType" "UserType" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("IdUser")
);

-- CreateTable
CREATE TABLE "Product" (
    "IdProduct" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,
    "Model" TEXT NOT NULL,
    "Stock" INTEGER NOT NULL,
    "Cost" DOUBLE PRECISION NOT NULL,
    "Value" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("IdProduct")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "IdTransaction" SERIAL NOT NULL,
    "TransactionType" "TransactionType" NOT NULL,
    "Value" DOUBLE PRECISION NOT NULL,
    "Cost" DOUBLE PRECISION NOT NULL,
    "Date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("IdTransaction")
);

-- CreateTable
CREATE TABLE "PurchaseList" (
    "ProductId" INTEGER NOT NULL,
    "TransactionId" INTEGER NOT NULL,

    CONSTRAINT "PurchaseList_pkey" PRIMARY KEY ("ProductId","TransactionId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_Login_key" ON "User"("Login");

-- AddForeignKey
ALTER TABLE "PurchaseList" ADD CONSTRAINT "PurchaseList_ProductId_fkey" FOREIGN KEY ("ProductId") REFERENCES "Product"("IdProduct") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchaseList" ADD CONSTRAINT "PurchaseList_TransactionId_fkey" FOREIGN KEY ("TransactionId") REFERENCES "Transaction"("IdTransaction") ON DELETE RESTRICT ON UPDATE CASCADE;
