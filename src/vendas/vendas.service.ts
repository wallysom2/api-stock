import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CriarVendaDto } from './dto/criar-venda.dto';
import { AtualizarVendaDto } from './dto/atualizar-venda.dto';

@Injectable()
export class VendasService {
  constructor(private prisma: PrismaService) {}

  async criarVenda(criarVendaDto: CriarVendaDto) {
    const valorTotal = criarVendaDto.produtos.reduce(
      (total, produto) => total + produto.quantidade * produto.precoUnitario,
      0,
    );

    return this.prisma.venda.create({
      data: {
        cliente: JSON.stringify(criarVendaDto.cliente),
        produtos: JSON.stringify(criarVendaDto.produtos),
        valorTotal,
        formaPagamento: criarVendaDto.formaPagamento,
      },
      include: {
        compras: true,
      },
    });
  }

  async listarVendas() {
    const vendas = await this.prisma.venda.findMany({
      include: {
        compras: true,
      },
    });

    return vendas.map(venda => ({
      ...venda,
      cliente: JSON.parse(venda.cliente as string),
      produtos: JSON.parse(venda.produtos as string),
      compras: venda.compras.map(compra => ({
        ...compra,
        produtos: JSON.parse(compra.produtos as string),
        fornecedor: JSON.parse(compra.fornecedor as string),
      })),
    }));
  }

  async buscarVendaPorId(id: number) {
    const venda = await this.prisma.venda.findUnique({
      where: { id },
      include: {
        compras: true,
      },
    });

    if (!venda) {
      throw new NotFoundException(`Venda com ID ${id} não encontrada`);
    }

    return {
      ...venda,
      cliente: JSON.parse(venda.cliente as string),
      produtos: JSON.parse(venda.produtos as string),
      compras: venda.compras.map(compra => ({
        ...compra,
        produtos: JSON.parse(compra.produtos as string),
        fornecedor: JSON.parse(compra.fornecedor as string),
      })),
    };
  }

  async atualizarVenda(id: number, atualizarVendaDto: AtualizarVendaDto) {
    await this.buscarVendaPorId(id);

    const valorTotal = atualizarVendaDto.produtos?.reduce(
      (total, produto) => total + produto.quantidade * produto.precoUnitario,
      0,
    );

    const updateData: any = {};
    
    if (atualizarVendaDto.cliente) {
      updateData.cliente = JSON.stringify(atualizarVendaDto.cliente);
    }
    
    if (atualizarVendaDto.produtos) {
      updateData.produtos = JSON.stringify(atualizarVendaDto.produtos);
      updateData.valorTotal = valorTotal;
    }
    
    if (atualizarVendaDto.formaPagamento) {
      updateData.formaPagamento = atualizarVendaDto.formaPagamento;
    }

    const venda = await this.prisma.venda.update({
      where: { id },
      data: updateData,
      include: {
        compras: true,
      },
    });

    return {
      ...venda,
      cliente: JSON.parse(venda.cliente as string),
      produtos: JSON.parse(venda.produtos as string),
      compras: venda.compras.map(compra => ({
        ...compra,
        produtos: JSON.parse(compra.produtos as string),
        fornecedor: JSON.parse(compra.fornecedor as string),
      })),
    };
  }

  async excluirVenda(id: number) {
    await this.buscarVendaPorId(id);

    await this.prisma.compra.deleteMany({
      where: { vendaId: id },
    });

    await this.prisma.venda.delete({
      where: { id },
    });
  }
}
