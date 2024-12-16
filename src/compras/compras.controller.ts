import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, UseInterceptors } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { ComprasService } from './compras.service';
import { CriarCompraDto } from './dto/criar-compra.dto';
import { AtualizarCompraDto } from './dto/atualizar-compra.dto';
import { FormatDateInterceptor } from '../common/interceptors/format-date.interceptor';

@ApiTags('compras')
@Controller('compras')
@UseInterceptors(FormatDateInterceptor)
export class ComprasController {
  constructor(private readonly comprasService: ComprasService) {}

  @Post()
  @ApiOperation({ summary: 'Criar uma nova compra' })
  @ApiResponse({ status: 201, description: 'Compra criada com sucesso' })
  @ApiResponse({ status: 404, description: 'Venda não encontrada' })
  async criarCompra(@Body() criarCompraDto: CriarCompraDto) {
    return this.comprasService.criarCompra(criarCompraDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as compras' })
  @ApiResponse({ status: 200, description: 'Lista de compras retornada com sucesso' })
  async listarCompras() {
    return this.comprasService.listarCompras();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar uma compra pelo ID' })
  @ApiParam({ name: 'id', description: 'ID da compra' })
  @ApiResponse({ status: 200, description: 'Compra encontrada com sucesso' })
  @ApiResponse({ status: 404, description: 'Compra não encontrada' })
  async buscarCompraPorId(@Param('id') id: string) {
    return this.comprasService.buscarCompraPorId(Number(id));
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar uma compra' })
  @ApiParam({ name: 'id', description: 'ID da compra' })
  @ApiResponse({ status: 200, description: 'Compra atualizada com sucesso' })
  @ApiResponse({ status: 404, description: 'Compra não encontrada' })
  async atualizarCompra(
    @Param('id') id: string,
    @Body() atualizarCompraDto: AtualizarCompraDto,
  ) {
    return this.comprasService.atualizarCompra(Number(id), atualizarCompraDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Excluir uma compra' })
  @ApiParam({ name: 'id', description: 'ID da compra' })
  @ApiResponse({ status: 204, description: 'Compra excluída com sucesso' })
  @ApiResponse({ status: 404, description: 'Compra não encontrada' })
  async excluirCompra(@Param('id') id: string) {
    await this.comprasService.excluirCompra(Number(id));
  }
}
