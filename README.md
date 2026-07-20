# fc4-tdd

Projeto em TypeScript que simula um sistema de reservas de propriedades, inspirado em plataformas como Airbnb.

## O que este projeto faz

A aplicação é organizada em camadas:

- **domain**: entidades e regras de negócio
- **application**: serviços de caso de uso
- **infrastructure**: persistência, web controllers e repositórios

As principais regras cobertas no projeto são:

- criação de reservas
- cancelamento de reservas
- validação de disponibilidade da propriedade
- validação da quantidade de hóspedes
- cálculo de preço da reserva
- persistência com repositórios e TypeORM

## Tecnologias

- TypeScript
- Jest
- ts-jest
- Express
- TypeORM
- SQLite

## Como instalar

```bash
npm install
```

## Como rodar os testes

O projeto usa Jest com suporte a TypeScript via `ts-jest`.

Para executar todos os testes:

```bash
npm test
```

## Estrutura dos testes

O repositório possui testes de:

- entidades de domínio
- serviços de aplicação
- repositórios TypeORM
- mappers de persistência
- controllers HTTP

## Observação

Este repositório não possui um script separado de execução da aplicação; o foco principal está na implementação e validação via testes.
