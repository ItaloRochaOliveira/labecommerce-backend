-- Active: 1680538946667@@127.0.0.1@3306

--CRIANDO TABELA USERS
CREATE TABLE users(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL
);

--POPULANDO TABELA USERS
INSERT INTO users(id, name, email, password)
    VALUES
        ("0", "user0", "user0@gmail.com", "40028922"),
        ("1", "user1", "user1@gmail.com", "40028922"),
        ("2", "user2","user2@gmail.com", "40028922");

DROP TABLE users;
DROP TABLE purchases;
DROP TABLE purchases_products;
DROP TABLE product;

---------------------------------------------------------------

--CRIANDO TABELA PRODUTOS
CREATE TABLE product(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    description TEXT NOT NULL,
    imageUrl TEXT NOT NULL
);

--POPULANDO TABELA PRODUTOS
INSERT INTO product(id, name, price, description, imageUrl)
    VALUES
        ("0", "Nave acustica", 70.1, "Uma caixa de som com formato de nave.", "./img/nave-acustica.jpg"),
        ("1", "Kit Sistema Solar", 89.99, "Lampadas com formato de sistema solar", "./img/kit-sistema-solar.jpg"),
        ("2", "Onibus espacial", 207, "Onibus com tematica de espaço", "./img/onibus-espacial.jpg"),
        ("3", "Briquedo de matematica com tematica astronauta", 267, "brinquedo matematicom com tema espaço", "./espaco-com-matematica.jpg"),
        ("4", "6 peças de coelhos astronautas", 65, "Bonequinhos com formato de coelho espacial", "./img/coelho-espacial.jpg");


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
WHERE id = "0";

------------------------------------------------------------

--CRIANDO TABELA DE COMPRAS
CREATE TABLE purchases(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    total_price REAL NOT NULL,
    paid INTEGER NOT NULL DEFAULT 0,
    delivered_at TEXT DEFAULT (DATETIME()) NOT NULL,
    buyed_id TEXT NOT NULL,
    Foreign Key (buyed_id) REFERENCES users(id)
);

--POPULANDO TABELA
INSERT INTO purchases(id, total_price, buyed_id)
VALUES  
    ("p001", 200, "0"),
    ("p002", 300, "0"),
    ("p003", 100, "1"),
    ("p004", 500, "2");

UPDATE purchases
SET
    delivered_at = DATETIME("now")
WHERE id = "p001";

UPDATE purchases 
SET 
    paid = 1
WHERE id = "p001";

SELECT 
    purchases.id as purchaseId,
    purchases.total_price as totalPrice,
    (CASE 
        WHEN purchases.paid = 0 THEN "not paid"
        ELSE "paid"
    END) as paid,
    purchases.delivered_at as deliveredAt,
    purchases.buyed_id as buyedId,
    users.email
FROM purchases
INNER JOIN users
ON purchases.buyed_id = users.id;


--EXERCICIO 06/04/2023
--CRIANDO TABELA DE RELAÇÕES ENTRE PURCHASE E PRODUCTS
CREATE TABLE purchases_products(
    purchase_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    Foreign Key (purchase_id) REFERENCES purchases(id),
    Foreign Key (product_id) REFERENCES product(id)
);

--POPULANDO
INSERT INTO purchases_products
VALUES
    ("p001", "0", 2),
    ("p001", "4", 1),
    ("p002", "1", 1),
    ("p002", "2", 1),
    ("p003", "1", 1);

INSERT INTO purchases_products 
VALUES 
    ("p004", "2", 2),
    ("p004", "1", 1);

SELECT * FROM purchases_products;

--RETORNANDO
SELECT
    users.id,
    users.email,
    purchases.id as idPurchase,
    purchases.paid,
    product.id as idProduct,
    product.name,
    product.description,
    product.price,
    purchases_products.quantity,
    purchases.total_price
FROM purchases
LEFT JOIN purchases_products
ON purchases_products.purchase_id = purchases.id
LEFT JOIN product
ON purchases_products.product_id = product.id
LEFT JOIN users
ON purchases.buyed_id = users.id;