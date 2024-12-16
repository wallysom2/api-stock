import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VendasModule } from './vendas/vendas.module';
import { ComprasModule } from './compras/compras.module';

@Module({
  imports: [VendasModule, ComprasModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
