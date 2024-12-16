import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, UseInterceptors } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { VendasService } from './vendas.service';
import { CriarVendaDto } from './dto/criar-venda.dto';
import { AtualizarVendaDto } from './dto/atualizar-venda.dto';
import { FormatDateInterceptor } from '../common/interceptors/format-date.interceptor';

@ApiTags('vendas')
@Controller('vendas')
@UseInterceptors(FormatDateInterceptor)
export class VendasController {
  constructor(private readonly vendasService: VendasService) {}

  @Post()
  @ApiOperation({ summary: 'Criar uma nova venda' })
  @ApiResponse({ status: 201, description: 'Venda criada com sucesso' })
  async criarVenda(@Body() criarVendaDto: CriarVendaDto) {
    return this.vendasService.criarVenda(criarVendaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as vendas' })
  @ApiResponse({ status: 200, description: 'Lista de vendas retornada com sucesso' })
  async listarVendas() {
    return this.vendasService.listarVendas();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar uma venda pelo ID' })
  @ApiParam({ name: 'id', description: 'ID da venda' })
  @ApiResponse({ status: 200, description: 'Venda encontrada com sucesso' })
  @ApiResponse({ status: 404, description: 'Venda não encontrada' })
  async buscarVendaPorId(@Param('id') id: string) {
    return this.vendasService.buscarVendaPorId(Number(id));
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar uma venda' })
  @ApiParam({ name: 'id', description: 'ID da venda' })
  @ApiResponse({ status: 200, description: 'Venda atualizada com sucesso' })
  @ApiResponse({ status: 404, description: 'Venda não encontrada' })
  async atualizarVenda(
    @Param('id') id: string,
    @Body() atualizarVendaDto: AtualizarVendaDto,
  ) {
    return this.vendasService.atualizarVenda(Number(id), atualizarVendaDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Excluir uma venda' })
  @ApiParam({ name: 'id', description: 'ID da venda' })
  @ApiResponse({ status: 204, description: 'Venda excluída com sucesso' })
  @ApiResponse({ status: 404, description: 'Venda não encontrada' })
  async excluirVenda(@Param('id') id: string) {
    await this.vendasService.excluirVenda(Number(id));
  }
}
