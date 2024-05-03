import { TypeOrmModule } from '@nestjs/typeorm';
import { Produtos } from './entities/produtos.entity';
import { Module } from '@nestjs/common';
import { ProdutosService } from './services/produtos.service';
import { ProdutosController } from './controllers/produtos.controller';
import { CategoriasService } from 'src/categorias/services/categorias.service';
import { CategoriasModule } from 'src/categorias/categorias.module';

@Module({

    imports: [TypeOrmModule.forFeature([Produtos]), CategoriasModule],
    providers: [ProdutosService, CategoriasService],
    controllers: [ProdutosController],
    exports:[TypeOrmModule]
})
export class ProdutosModule{

}