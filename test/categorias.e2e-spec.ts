import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppModule } from '../src/app.module';

describe('Testes do Módulo Categorias (e2e)', () => {
  
  let token: any;
  let tipo: any;
  let categoriaId: any;
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: "sqlite",
          database: 'db_farmacia_test.db',
          entities: [__dirname + "./../src/**/entities/*.entity.ts"],
          synchronize: true,
          dropSchema: true
        }),
        AppModule
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('00 - Cadastrando usuario para testes', async () => {
    const resposta = await request(app.getHttpServer())
      .post('/usuarios/cadastrar')
      .send({
        nome: 'Henrique',
        usuario: 'root@root.com',
        senha: 'rootroot',
        foto: ' '
      });
    expect(201)
  })

  it('00 - Autenticando Usuario (Login) para testes', async () => {
    const resposta = await request(app.getHttpServer())
      .post('/usuarios/logar')
      .send({
        usuario: 'root@root.com',
        senha: 'rootroot'
      });
    expect(200)

    token = resposta.body.token;
  })

  it('01 - Deve Cadastrar um Categorias', async () => {
    const resposta = await request(app.getHttpServer())
      .post('/categorias')
      .set('Authorization', `${token}`)
      .send({
        tipo: 'tipo qualquer'
      });
    expect(201)

    tipo = resposta.body.tipo
    categoriaId = resposta.body.id

  })

  it('02 - Deve Listar Todos os Categorias', async () => {
    return request(app.getHttpServer())
      .get('/categorias')
      .set('Authorization', `${token}`)
      .send({})
      .expect(200)
  })

  it('03 - Deve Listar Categorias por Tipo', async () => {
    return request(app.getHttpServer())
      .get(`/categorias/tipo/${tipo}`)
      .set('Authorization', `${token}`)
      .send({
        descricao: 'descrição qualquer'
      })
      .expect(200)
  })

  it('04 - Deve Listar Categorias por ID', async () => {
    return request(app.getHttpServer())
      .get(`/categorias/${categoriaId}`)
      .set('Authorization', `${token}`)
      .send({})
      .expect(200)
  })

  it('05 - Deve Atualizar uma Categoria', async () => {
    return request(app.getHttpServer())
      .put('/categorias')
      .set('Authorization', `${token}`)
      .send({
        id: 1,
        tipo: "Cosméticos"
      })
      .expect(200)
      .then(resposta => {
        expect("Cosméticos").toEqual(resposta.body.tipo)
      })
  })

  it('06 - Deve Apagar uma Categoria', async () => {
    return request(app.getHttpServer())
      .delete(`/categorias/${categoriaId}`)
      .set('Authorization', `${token}`)
      .send({})
      .expect(204)
  })

});