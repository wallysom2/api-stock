import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CriarCompraDto } from './dto/criar-compra.dto';
import { AtualizarCompraDto } from './dto/atualizar-compra.dto';

@Injectable()
export class ComprasService {
  constructor(private prisma: PrismaService) {}

  async criarCompra(criarCompraDto: CriarCompraDto) {
    // Verifica se a venda existe
    const venda = await this.prisma.venda.findUnique({
      where: { id: criarCompraDto.vendaId },
    });

    if (!venda) {
      throw new NotFoundException(`Venda com ID ${criarCompraDto.vendaId} não encontrada`);
    }

    const valorTotal = criarCompraDto.produtos.reduce(
      (total, produto) => total + produto.quantidade * produto.precoUnitario,
      0,
    );

    return this.prisma.compra.create({
      data: {
        vendaId: criarCompraDto.vendaId,
        produtos: JSON.stringify(criarCompraDto.produtos),
        valorTotal,
        fornecedor: JSON.stringify(criarCompraDto.fornecedor),
        formaPagamento: criarCompraDto.formaPagamento,
      },
      include: {
        venda: true,
      },
    });
  }

  async listarCompras() {
    const compras = await this.prisma.compra.findMany({
      include: {
        venda: true,
      },
    });

    return compras.map(compra => ({
      ...compra,
      produtos: JSON.parse(compra.produtos as string),
      fornecedor: JSON.parse(compra.fornecedor as string),
      venda: {
        ...compra.venda,
        cliente: JSON.parse(compra.venda.cliente as string),
        produtos: JSON.parse(compra.venda.produtos as string),
      },
    }));
  }

  async buscarCompraPorId(id: number) {
    const compra = await this.prisma.compra.findUnique({
      where: { id },
      include: {
        venda: true,
      },
    });

    if (!compra) {
      throw new NotFoundException(`Compra com ID ${id} não encontrada`);
    }

    return {
      ...compra,
      produtos: JSON.parse(compra.produtos as string),
      fornecedor: JSON.parse(compra.fornecedor as string),
      venda: {
        ...compra.venda,
        cliente: JSON.parse(compra.venda.cliente as string),
        produtos: JSON.parse(compra.venda.produtos as string),
      },
    };
  }

  async atualizarCompra(id: number, atualizarCompraDto: AtualizarCompraDto) {
    await this.buscarCompraPorId(id);

    const valorTotal = atualizarCompraDto.produtos?.reduce(
      (total, produto) => total + produto.quantidade * produto.precoUnitario,
      0,
    );

    const updateData: any = {};
    
    if (atualizarCompraDto.fornecedor) {
      updateData.fornecedor = JSON.stringify(atualizarCompraDto.fornecedor);
    }
    
    if (atualizarCompraDto.produtos) {
      updateData.produtos = JSON.stringify(atualizarCompraDto.produtos);
      updateData.valorTotal = valorTotal;
    }
    
    if (atualizarCompraDto.formaPagamento) {
      updateData.formaPagamento = atualizarCompraDto.formaPagamento;
    }

    const compra = await this.prisma.compra.update({
      where: { id },
      data: updateData,
      include: {
        venda: true,
      },
    });

    return {
      ...compra,
      produtos: JSON.parse(compra.produtos as string),
      fornecedor: JSON.parse(compra.fornecedor as string),
      venda: {
        ...compra.venda,
        cliente: JSON.parse(compra.venda.cliente as string),
        produtos: JSON.parse(compra.venda.produtos as string),
      },
    };
  }

  async excluirCompra(id: number) {
    await this.buscarCompraPorId(id);
    await this.prisma.compra.delete({
      where: { id },
    });
  }
}
