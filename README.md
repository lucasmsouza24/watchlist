# Watchlist

O Watchlist é uma forma de organizar tudo o que você assiste.

![npm](https://img.shields.io/npm/v/npm) ![node-current](https://img.shields.io/node/v/3)

## Instalação

1. Abra o terminal e clone o repositório:

```shell
git clone https://github.com/lucasmsouza24/watchlist.git

```

2. Navegue até o repositário clonado. Entre em src e instale as dependências:

```shell
npm install
```
3. Navegue até a raiz do repositório e execute o MySQL:  
Obs: "root" pode ser alterado para qualquer usuário que tenha permissão de criar tabelas.

```shell
mysql -u root -p
```

4. Crie o banco de dados:

```shell
source ./db/build-db.sql
```

5. Crie o usuário da aplicação:
```shell
source ./db/create-user.sql
```

## Uso
1. Abra o terminal e navegue até a raiz do projeto.
2. entre na pasta "src" e inicie a aplicação
```shell
npm start
```
