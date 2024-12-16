<div align="center">
  <a href="http://nestjs.com/" target="blank">
    <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" />
  </a>

  <h1>Sistema de Gestão de Vendas e Compras</h1>
  <p>Uma API robusta construída com NestJS para gerenciamento de operações comerciais</p>

  <p>
    <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
    <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
    <a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
  </p>
</div>

## 📋 Sobre o Projeto

Este é um sistema de gestão desenvolvido com NestJS, focado no controle de vendas e compras. A aplicação oferece uma API REST completa para gerenciar todas as operações comerciais de forma eficiente e escalável.

### 🚀 Funcionalidades Principais

- Gestão completa de vendas
- Controle de compras
- Integração com banco de dados via Prisma
- Validação de dados com DTOs
- Testes automatizados

## 🛠️ Tecnologias Utilizadas

- [NestJS](https://nestjs.com/) - Framework Node.js
- [Prisma](https://www.prisma.io/) - ORM
- [TypeScript](https://www.typescriptlang.org/) - Linguagem de programação
- [Jest](https://jestjs.io/) - Framework de testes

## 💻 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- Node.js (versão 14 ou superior)
- npm ou yarn
- PostgreSQL (ou outro banco de dados compatível com Prisma)

## 🚀 Instalação e Configuração

1. Clone o repositório:
```bash
git clone [url-do-repositorio]
cd [nome-do-projeto]
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
# Edite o arquivo .env com suas configurações
```

4. Execute as migrações do banco de dados:
```bash
npx prisma migrate dev
```

## 🎯 Executando o Projeto

```bash
# Modo desenvolvimento
npm run start:dev

# Modo produção
npm run start:prod
```


## 📚 Documentação da API

A documentação completa da API está disponível através do Swagger UI após iniciar o projeto:

```
http://localhost:3000/api
```

### Endpoints Principais

- `POST /vendas` - Criar nova venda
- `GET /vendas` - Listar todas as vendas
- `POST /compras` - Registrar nova compra
- `GET /compras` - Listar todas as compras

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.



---

<p align="center">
  Desenvolvido com ❤️ usando <a href="https://nestjs.com/" target="_blank">NestJS</a>
</p>
