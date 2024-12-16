/*
  Warnings:

  - Added the required column `formaPagamento` to the `Compra` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fornecedor` to the `Compra` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cliente` to the `Venda` table without a default value. This is not possible if the table is not empty.
  - Added the required column `formaPagamento` to the `Venda` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Compra" ADD COLUMN     "formaPagamento" TEXT NOT NULL,
ADD COLUMN     "fornecedor" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "Venda" ADD COLUMN     "cliente" JSONB NOT NULL,
ADD COLUMN     "formaPagamento" TEXT NOT NULL;
