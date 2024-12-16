import { ApiProperty } from '@nestjs/swagger';
import { FormaPagamento } from '../../common/enums/forma-pagamento.enum';

class EnderecoDto {
  @ApiProperty({ example: 'Av. dos Automóveis' })
  rua: string;

  @ApiProperty({ example: '1234' })
  numero: string;

  @ApiProperty({ required: false, example: 'Galpão 2' })
  complemento?: string;

  @ApiProperty({ example: 'Centro' })
  bairro: string;

  @ApiProperty({ example: 'São Paulo' })
  cidade: string;

  @ApiProperty({ example: 'SP' })
  estado: string;

  @ApiProperty({ example: '01234-567' })
  cep: string;
}

class ClienteDto {
  @ApiProperty({ required: false, example: 1 })
  id?: number;

  @ApiProperty({ example: 'Oficina Mecânica Silva & Filhos' })
  nome: string;

  @ApiProperty({ example: '12.345.678/0001-90' })
  documento: string;

  @ApiProperty({ example: 'contato@oficinavsilva.com.br' })
  email: string;

  @ApiProperty({ example: '(11) 3456-7890' })
  telefone: string;

  @ApiProperty()
  endereco: EnderecoDto;
}

class ProdutoDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Disco de Freio Dianteiro' })
  nome: string;

  @ApiProperty({ example: 'Fremax' })
  fabricante: string;

  @ApiProperty({ example: 10 })
  quantidade: number;

  @ApiProperty({ example: 189.90 })
  precoUnitario: number;
}

export class AtualizarVendaDto {
  @ApiProperty({ required: false })
  cliente?: ClienteDto;

  @ApiProperty({ type: [ProdutoDto], required: false })
  produtos?: ProdutoDto[];

  @ApiProperty({ enum: FormaPagamento, required: false, example: FormaPagamento.BOLETO })
  formaPagamento?: FormaPagamento;
}
