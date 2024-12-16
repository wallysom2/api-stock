-- CreateTable
CREATE TABLE "Venda" (
    "id" SERIAL NOT NULL,
    "produtos" JSONB NOT NULL,
    "valorTotal" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Venda_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Compra" (
    "id" SERIAL NOT NULL,
    "vendaId" INTEGER NOT NULL,
    "produtos" JSONB NOT NULL,
    "valorTotal" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Compra_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Compra" ADD CONSTRAINT "Compra_vendaId_fkey" FOREIGN KEY ("vendaId") REFERENCES "Venda"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
