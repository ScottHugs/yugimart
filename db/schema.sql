CREATE DATABASE yugimart;

\c yugimart;

CREATE TABLE singles(
    item_id SERIAL PRIMARY KEY,
    card_name TEXT, 
    set TEXT, 
    rarity TEXT, 
    condition TEXT, 
    language TEXT, 
    seller_id INTEGER, 
    price NUMERIC, 
    offers BOOLEAN,
    item_img TEXT, 
    shipping_1 TEXT, 
    shipping_1_price NUMERIC, 
    shipping_2 TEXT, 
    shipping_2_price NUMERIC,
    shipping_3 TEXT, 
    shipping_3_price NUMERIC 
);

INSERT INTO singles(card_name, set, rarity, condition, language, seller_id, price, offers, item_img, shipping_1, shipping_1_price, shipping_2, shipping_2_price) VALUES ('BLUE EYES WHITE DRAGON', 'LOB-001', 'UR', 'NM', 'ENG', 1, 5000.00, TRUE, 'https://i.ebayimg.com/images/g/oNMAAOSwf8BgtAQt/s-l1600.jpg', 'tracked', 3.00, 'express', 8.00 );

INSERT INTO singles(card_name, set, rarity, condition, language, seller_id, price, offers, item_img, shipping_1, shipping_1_price) VALUES ('DARK MAGICIAN', 'LOB-005', 'UR', 'LP', 'ENG', 1, 300.00, FALSE, 'https://guf.com.au/cdn/shop/products/1f8a51bd-eabf-512f-af5b-42434522bbd3_800x.jpg?v=1672755963', 'express', 8.00 );

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    user_name TEXT, 
    email TEXT, 
    address TEXT, 
    password_digest TEXT
);