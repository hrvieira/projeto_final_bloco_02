import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { CategoriasService } from "../services/categorias.service";
import { Categorias } from "../entities/categorias.entity";

@Controller("/categorias")
export class CategoriasController{
    
    constructor(private readonly categoriasService: CategoriasService){}

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Categorias[]>{
        return this.categoriasService.findAll();
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id : number): Promise<Categorias>{
        return this.categoriasService.findById(id);
    }

    @Get('tipo/:tipo')
    @HttpCode(HttpStatus.OK)
    findByTipo(@Param('tipo')tipo : string): Promise<Categorias[]>{
        return this.categoriasService.findByTipo(tipo);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() categorias: Categorias): Promise<Categorias>{
        return this.categoriasService.create(categorias);
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() categorias: Categorias): Promise<Categorias> {
        return this.categoriasService.update(categorias);
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.categoriasService.delete(id);
    }
    
}