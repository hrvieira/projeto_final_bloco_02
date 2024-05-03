import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from 'typeorm';
import { Categorias } from "../entities/categorias.entity";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

@Injectable()
export class CategoriasService {

    constructor(
        @InjectRepository(Categorias)
        private CategoriasRepository: Repository<Categorias>
    ) { }
    
    async findAll(): Promise<Categorias[]> {
        return await this.CategoriasRepository.find({
        });
    }

    async findById(id: number): Promise<Categorias>{
        let categorias = await this.CategoriasRepository.findOne({
            where: {
                id
            }
        });
        if (!categorias)
            throw new HttpException('Categoria não encontrada!', HttpStatus.NOT_FOUND);

        return categorias;
    }

    async findByTipo(tipo: string): Promise<Categorias[]>{
        return await this.CategoriasRepository.find({
            where: {
                tipo: ILike(`%${tipo}%`)
            }
        })
    }

    async create(categorias: Categorias): Promise<Categorias>{
        return await this.CategoriasRepository.save(categorias);
    }

    async update(categorias: Categorias): Promise<Categorias>{

        let buscaCategorias = await this.findById(categorias.id);

        if (!buscaCategorias || !categorias.id)
            throw new HttpException('Categoria não encontrada!', HttpStatus.NOT_FOUND);
     
        return await this.CategoriasRepository.save(categorias);
    }
    
    async delete(id: number): Promise<DeleteResult>{
        let buscaCategorias = await this.findById(id)

        if (!buscaCategorias)
            throw new HttpException('Categoria não encontrada!', HttpStatus.NOT_FOUND);

        return await this.CategoriasRepository.delete(id);
    }

}