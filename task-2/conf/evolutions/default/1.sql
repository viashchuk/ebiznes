# --- !Ups

CREATE TABLE category (
  id BIGINT NOT NULL AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE product (
  id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  price DOUBLE NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  category_id BIGINT,
  FOREIGN KEY (category_id) REFERENCES category (id)
);

CREATE TABLE cart (
  id BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  product_id BIGINT NOT NULL,
  amount INT NOT NULL,
  FOREIGN KEY (product_id) REFERENCES product (id)
);

# --- !Downs

DROP TABLE cart;
DROP TABLE product;
DROP TABLE category;