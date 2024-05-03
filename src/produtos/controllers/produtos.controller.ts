import { ProdutosService } from "../services/produtos.service";
import { Produtos } from '../entities/produtos.entity';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseFloatPipe, ParseIntPipe, Post, Put } from "@nestjs/common";


@Controller("/produtos")
export class ProdutosController{
    
    constructor(private readonly produtosService: ProdutosService){}

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Produtos[]>{
        return this.produtosService.findAll();
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id : number): Promise<Produtos>{
        return this.produtosService.findById(id);
    }

    @Get('titulo/:titulo')
    @HttpCode(HttpStatus.OK)
    findByTipo(@Param('titulo') titulo : string): Promise<Produtos[]>{
        return this.produtosService.findByTitulo(titulo);
    }

    @Get('preco/maior/:preco')
    @HttpCode(HttpStatus.OK)
    findByMaiorPreco(@Param('preco', ParseFloatPipe) preco : number): Promise<Produtos[]>{
        try {
            return this.produtosService.findByMaiorPreco(preco);
        } catch (error) {
            throw new Error('Erro ao processar sua solicitação');
        }
    }

    @Get('preco/menor/:preco')
    @HttpCode(HttpStatus.OK)
    findByMenorPreco(@Param('preco', ParseFloatPipe) preco : number): Promise<Produtos[]>{
        try {
            return this.produtosService.findByMenorPreco(preco);
        } catch (error) {
            throw new Error('Erro ao processar sua solicitação');
        }
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() produtos: Produtos): Promise<Produtos>{
        return this.produtosService.create(produtos);
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() produtos: Produtos): Promise<Produtos> {
        return this.produtosService.update(produtos);
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.produtosService.delete(id);
    }
    
}