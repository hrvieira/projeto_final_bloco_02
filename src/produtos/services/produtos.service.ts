import { CategoriasService } from './../../categorias/services/categorias.service';
import { Produtos } from '../entities/produtos.entity';
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, LessThan, MoreThan, Repository } from 'typeorm';
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

@Injectable()
export class ProdutosService {
    
    constructor(
        @InjectRepository(Produtos)
        private produtosRepository: Repository<Produtos>,
        private categoriasService: CategoriasService
    ) { }
    
    async findAll(): Promise<Produtos[]> {
        return await this.produtosRepository.find({
            relations:{
                categorias: true,
                usuario: true
            }
        });
    }

    async findById(id: number): Promise<Produtos>{
        let produtos = await this.produtosRepository.findOne({
            where: {
                id
            },relations:{
                categorias: true
            }
        });

        if (!produtos)
            throw new HttpException('Produtos não encontrado!', HttpStatus.NOT_FOUND);

        return produtos;
    }

    async findByTitulo(titulo: string): Promise<Produtos[]>{
        return await this.produtosRepository.find({
            where: {
                titulo: ILike(`%${titulo}%`)
            },relations:{
                categorias: true,
                usuario: true
            }
        })
    }

    async findByMaiorPreco(preco: number): Promise<Produtos[]> {
        return await this.produtosRepository.find({
            where: {
                preco: MoreThan(preco)
            },
            order: {
                titulo: 'ASC'
            },
            relations: {
                categorias: true,
                usuario: true
            }
        })
    }

    async findByMenorPreco(preco: number): Promise<Produtos[]> {
        return await this.produtosRepository.find({
            where: {
                preco: LessThan(preco)
            },
            order: {
                titulo: 'DESC'
            },
            relations: {
                categorias: true,
                usuario: true
            }
        })
    }

    async create(produtos: Produtos): Promise<Produtos>{

        if (produtos.categorias){

            let categorias = await this.categoriasService.findById(produtos.categorias.id)

            if(!categorias)
                throw new HttpException('Categoria não foi encontrada!', HttpStatus.NOT_FOUND)

            return await this.produtosRepository.save(produtos);
        }

        return await this.produtosRepository.save(produtos);

    }

    async update(produtos: Produtos): Promise<Produtos>{

        if (produtos.categorias){

            let categorias = await this.categoriasService.findById(produtos.categorias.id)

            if(!categorias)
                throw new HttpException('Categoria não encontrada!', HttpStatus.NOT_FOUND)

            return await this.produtosRepository.save(produtos);
        }

        let buscaProdutos = await this.findById(produtos.id);

        if (!buscaProdutos || !produtos.id)
            throw new HttpException('Produtos não encontrado!', HttpStatus.NOT_FOUND);
     
        return await this.produtosRepository.save(produtos);
    }

    async delete(id: number): Promise<DeleteResult>{
        let buscaProdutos = await this.findById(id)

        if (!buscaProdutos)
            throw new HttpException('Produtos não encontrado!', HttpStatus.NOT_FOUND);

        return await this.produtosRepository.delete(id);
    }
 
}