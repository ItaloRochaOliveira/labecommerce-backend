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


---------------------------------------------------------------

--getAllUsers
SELECT * FROM users
ORDER BY email ASC;

--getAllProducts - versão 1
SELECT * FROM produtos
ORDER BY price ASC
LIMIT 20
OFFSET 0;

--getAllProducts - versão 1
SELECT * from produtos
WHERE price >= 100 AND price <= 300
ORDER BY price ASC;

--Seach product by name
SELECT * FROM produtos
WHERE name LIKE "%oni%";

--Create User category
INSERT INTO users(id, email, password)
    Values("3", "it3@gmail.com", "40028922");

--Create Product
INSERT INTO produtos(id, name, price, category)
    VALUES("5", "Boneco astronauta com ornamento externo", 83, "boneco");


--Get products by id 
SELECT * FROM produtos
WHERE id = "1";

--Delete User by id
DELETE FROM users
WHERE id = "3";

--Delete produtos by id
DELETE FROM produtos
WHERE id = "5";

--Edit user by id
UPDATE users 
SET password = "1234"
WHERE id = "1";

--edit product by id
UPDATE produtos
SET 
    name = "Nave normal",
    price = 60
WHERE id = "0"

