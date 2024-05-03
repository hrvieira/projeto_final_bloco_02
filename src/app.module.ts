import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categorias } from './categorias/entities/categorias.entity';
import { CategoriasModule } from './categorias/categorias.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_farmacia_go',
      entities: [Categorias],
      synchronize: true,
    }),
    CategoriasModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
