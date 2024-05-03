import { Transform, TransformFnParams } from 'class-transformer';
import { IsNotEmpty, IsNumber} from 'class-validator';
import { Categorias } from '../../categorias/entities/categorias.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Usuario } from '../../usuario/entities/usuario.entity';

@Entity({ name: "tb_produtos" })
export class Produtos{

    @PrimaryGeneratedColumn()
    id: number;

    @Transform(({value}: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Column({length: 100, nullable: false})
    titulo: string;

    @Transform(({value}: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Column({length: 1000, nullable: false})
    descricao: string;

    @Transform(({value}: TransformFnParams) => value?.trim())
    @IsNotEmpty()
    @Column({length: 500, nullable: false})
    foto: string;

    @IsNumber({maxDecimalPlaces: 2})
    @IsNotEmpty()
    @Column({type: "decimal", precision: 10, scale: 2})
    preco: number;

    @ManyToOne(() => Categorias, (categorias) => categorias.produtos, {
        onDelete: "CASCADE"
    })
    categorias: Categorias;

    @ManyToOne(() => Usuario, (usuario) => usuario.produtos, {
        onDelete: "CASCADE"
    })
    usuario: Usuario
    
}