/* DROP DATABASE db_watchlist; */
CREATE DATABASE db_watchlist;
USE db_watchlist;

-- tb_user
CREATE TABLE tb_user(
    pk_user INT PRIMARY KEY AUTO_INCREMENT,
    nick VARCHAR(45) NOT NULL UNIQUE,
    email VARCHAR(45) NOT NULL UNIQUE,
    pwd VARCHAR(45) NOT NULL
);

/* insert tb_user */
INSERT INTO tb_user(nick, email, pwd) VALUES
('admin2', 'admin2@admin.com', 'urubu100');

/* DESC tb_user;
SELECT * FROM tb_user; */

-- tb_genre
CREATE TABLE tb_genre(
    pk_genre INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(45) NOT NULL UNIQUE
);

/* insert tb_genre */
INSERT INTO tb_genre(name) VALUES
('drama'),
('ação'),
('aventura'),
('esporte');

/* DESC tb_genre; */
/* SELECT * FROM tb_genre;  */

/* tb_media */
CREATE TABLE tb_media(
    pk_media INT PRIMARY KEY AUTO_INCREMENT,
    type VARCHAR(20) CHECK(
        type = 'movie' OR type = 'tvserie' OR type = 'anime'
        ) NOT NULL,
    title VARCHAR(50) NOT NULL UNIQUE,
    synopsis TEXT NOT NULL,
    since_year YEAR NOT NULL,
    total_eps INT NOT NULL CHECK(total_eps >= 0),
    banner_url VARCHAR(255),
    fk_genre INT NOT NULL,
    fk_added_by INT NOT NULL,
    FOREIGN KEY (fk_genre) REFERENCES tb_genre(pk_genre),
    FOREIGN KEY (fk_added_by) REFERENCES tb_user(pk_user)
);

/* insert media */

INSERT INTO tb_media(type, title, synopsis, since_year, total_eps, banner_url, fk_genre, fk_added_by) VALUES
('anime', 'Fumetsu no Anata E', 'Um ser imortal foi enviado para a superfície da Terra e encontrou um garoto vivendo sozinho no meio da tundra. O ser pode tomar a forma de coisas mortas, mas só se o “impulso” for mais forte do que o anterior. Que tipo de experiências e encontros ocorrerão enquanto se vive para sempre?', 2021, 10, '.\\img\\data\\poster\\example-poster.jpg', 3, 1);

/* DESC tb_media */
/* SELECT * FROM tb_media */

/* tb_comments */
CREATE TABLE comments(
    pk_comments INT PRIMARY KEY AUTO_INCREMENT,
    comment_text TEXT,
    fk_media INT,
    fk_user INT,
    FOREIGN KEY (fk_media) REFERENCES tb_media(pk_media),
    FOREIGN KEY (fk_user) REFERENCES tb_user(pk_user)
);

/* insert comments */
INSERT INTO comments(comment_text, fk_media, fk_user) VALUES 
('Curti muito. Melhor anime da temporada', 1, 1);

/* DESC comments; */
/* SELECT * FROM comments; */

/* tb_user_has_media */
CREATE TABLE tb_avaliacao(
    pk_avaliacao INT PRIMARY KEY AUTO_INCREMENT,
    score INT CHECK(score >= 0 AND score <= 10),
    situation VARCHAR(20) CHECK(
        situation = 'plan-to-watch' OR
        situation = 'watching' OR
        situation = 'complete' OR
        situation = 'droped' 
    ), 
    eps_assistidos int check(eps_assistidos >= 0),
    fk_user INT, 
    fk_media INT,
    FOREIGN KEY(fk_user) REFERENCES tb_user(pk_user),
    FOREIGN KEY(fk_media) REFERENCES tb_media(pk_media)
);

/* insert user_has_media */
INSERT INTO tb_avaliacao(score, situation, fk_user, fk_media) VALUES 
(10, 'watching', 1, 1); 

/* DESC tb_user_has_media; */
/* SELECT * FROM tb_user_has_media; */

/* user and privileges */

/* GRANT INSERT ON db_watchlist.tb_user TO 'wl_sys'@'localhost'; */

/* GRANT INSERT, SELECT, UPDATE ON db_watchlist.tb_user TO 'wl_sys'@'localhost'; */

/* CREATE USER 'wl_user'@'localhost' IDENTIFIED BY 'urubu100'; */

/* GRANT INSERT, SELECT ON db_watchlist.tb_media TO 'wl_user'@'localhost'; */

/* GRANT INSERT, SELECT ON db_watchlist.comments TO 'wl_user'@'localhost'; */

/* GRANT INSERT, SELECT ON db_watchlist.tb_user_has_media TO 'wl_user'@'localhost'; */

/* GRANT INSERT, SELECT ON db_watchlist.tb_genre TO 'wl_user'@'localhost'; */

/* GRANT SELECT ON db_watchlist.tb_genre TO 'wl_user'@'localhost'; */

/* SHOW GRANTS FOR 'wl_user'@'localhost'; */

/* SHOW GRANTS FOR 'wl_sys'@'localhost'; */

/* GRANT SELECT ON db_watchlist.tb_media TO 'wl_sys'@'localhost'; */

/* GRANT SELECT ON db_watchlist.comments TO 'wl_sys'@'localhost'; */

/* GRANT SELECT ON db_watchlist.tb_user_has_media TO 'wl_sys'@'localhost'; */

-- UPDATE tb_avaliacao SET score = 9, situation = 'watching', eps_assistidos = 4 WHERE fk_user = 1 AND fk_media = 6;