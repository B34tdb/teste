## Instalar dependências

Na pasta do projeto, execute:

```
yarn

// ou

npm install
```

## Formatação de Código (Opcional mas recomendado)

O ESLint e o Prettier estão configurados para garantir a organização do código.
Você pode baixar as extensões para seu editor caso queira. Lembre-se que a legibilidade do código é importante.
Aqui estão os links das duas extensões para o VS Code:

[ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

[Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## Configurar MySQL

Crie uma instância de MySQL em sua máquina.

Caso utilize o Docker, execute o seguinte comando para criar um container:

```
docker run --name mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=docker -d mysql:5.7
```

Usuário: root
Password: docker
Host: localhost
Port: 3306

Essa configuração sugerida é utilizada no arquivo `knexfile.js`.

## Criar Database

Crie uma database de desenvolvimento e uma para testes dentro do seu MySQL com os nomes:

`yappi_invest` e `yappi_invest_test`

## Execute as Migrations

```
npx knex migrate:latest
npx knex migrate:latest --env test
```

## Crie um usuário

Insira um usuário na sua tabela, com nome, email e senha.

Não vamos criar um processo de cadastro na aplicação e também não vamos criptografar a senha, já que esta aplicação servirá apenas para o processo seletivo.

Você pode fazer isso através de uma GUI como o [DBeaver](https://dbeaver.io/) ou através do terminal.

```sql
USE yappi_invest;

# Verifique se a database certa foi selecionada
SELECT DATABASE();

INSERT INTO users (name, email, password) VALUES ('Ellie', 'ellie@gmail.com', 'joelmiller');
```

## Execução

```
yarn start

// ou

npm start
```

## Cheatsheet

- Knex

```
// Criar nova migration (arquivo criado em src/database/migrations)
npx knex migrate:make nome_da_migration

// Executar todas as migrations não realizadas
npx knex migrate:latest
npx knex migrate:latest --env test

// Rollback de todas as migrations
npx knex migrate:rollback --all
```

- Jest

```
// Testar tudo
yarn test

// Testar apenas um arquivo
yarn test -- arquivo.test.js

```
