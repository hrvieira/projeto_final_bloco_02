import { IsNotEmpty } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Produtos } from "../../produtos/entities/produtos.entity";

@Entity({name: "tb_categorias"})
export class Categorias{

    @PrimaryGeneratedColumn()
    id: number

    @IsNotEmpty()
    @Column({ length: 255, nullable: false })
    tipo: string

    @OneToMany(() => Produtos, (produtos) => produtos.categorias)
    produtos: Produtos[];
    
}