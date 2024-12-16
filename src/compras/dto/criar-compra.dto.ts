import { ApiProperty } from '@nestjs/swagger';
import { FormaPagamento } from '../../common/enums/forma-pagamento.enum';

class EnderecoDto {
  @ApiProperty({ example: 'Rua das Autopeças' })
  rua: string;

  @ApiProperty({ example: '500' })
  numero: string;

  @ApiProperty({ required: false, example: 'Galpão A' })
  complemento?: string;

  @ApiProperty({ example: 'Distrito Industrial' })
  bairro: string;

  @ApiProperty({ example: 'Guarulhos' })
  cidade: string;

  @ApiProperty({ example: 'SP' })
  estado: string;

  @ApiProperty({ example: '07123-456' })
  cep: string;
}

class ContatoDto {
  @ApiProperty({ example: 'João Silva' })
  nome: string;

  @ApiProperty({ example: 'joao.silva@distribuidorprincipal.com.br' })
  email: string;

  @ApiProperty({ example: '(11) 98765-4321' })
  telefone: string;

  @ApiProperty({ example: 'Gerente de Vendas' })
  cargo: string;
}

class FornecedorDto {
  @ApiProperty({ required: false, example: 1 })
  id?: number;

  @ApiProperty({ example: 'AutoPeças Distribuidor Principal LTDA' })
  razaoSocial: string;

  @ApiProperty({ example: 'Distribuidor Principal' })
  nomeFantasia: string;

  @ApiProperty({ example: '98.765.432/0001-10' })
  cnpj: string;

  @ApiProperty({ example: 'vendas@distribuidorprincipal.com.br' })
  email: string;

  @ApiProperty({ example: '(11) 4567-8901' })
  telefone: string;

  @ApiProperty()
  endereco: EnderecoDto;

  @ApiProperty()
  contato: ContatoDto;
}

class ProdutoDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Disco de Freio Dianteiro' })
  nome: string;

  @ApiProperty({ example: 'Fremax' })
  fabricante: string;

  @ApiProperty({ example: 6 })
  quantidade: number;

  @ApiProperty({ example: 145.90 })
  precoUnitario: number;
}

export class CriarCompraDto {
  @ApiProperty({ example: 1 })
  vendaId: number;

  @ApiProperty()
  fornecedor: FornecedorDto;

  @ApiProperty({ type: [ProdutoDto] })
  produtos: ProdutoDto[];

  @ApiProperty({ enum: FormaPagamento, example: FormaPagamento.PIX })
  formaPagamento: FormaPagamento;
}
