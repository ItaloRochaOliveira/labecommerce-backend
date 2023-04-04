-- Active: 1680538946667@@127.0.0.1@3306

--CRIANDO TABELA USERS
CREATE TABLE users(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);

--POPULANDO TABELA USERS
INSERT INTO users(id, email, password)
    VALUES
        ("0", "it@gmail.com", "40028922"),
        ("1", "it1@gmail.com", "40028922"),
        ("2", "it2@gmail.com", "40028922");

--ACESSANDO DADOS DA TABELA USERS
SELECT * FROM users;

DROP TABLE users;

---------------------------------------------------------------

--CRIANDO TABELA PRODUTOS
CREATE TABLE produtos(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    category TEXT NOT NULL
);

--POPULANDO TABELA PRODUTOS
INSERT INTO produtos(id, name, price, category)
    VALUES
        ("0", "Nave acustica", 70.1, "brinquedo"),
        ("1", "Kit Sistema Solar", 89.99, "brinquedo"),
        ("2", "Onibus espacial", 207, "brinquedo"),
        ("3", "Briquedo de matematica com tematica astronauta", 267, "brinquedo"),
        ("4", "6 peças de coelhos astronautas", 65, "boneco");

--ACESSANDO DADOS DA TABELA PRODUTOS
SELECT * FROM produtos;