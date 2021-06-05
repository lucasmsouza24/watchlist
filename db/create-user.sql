CREATE USER 'wl_user'@'localhost' IDENTIFIED BY '9a87s5d98AYS98Dy*&$*&';

GRANT ALL PRIVILEGES ON db_watchlist.* TO 'wl_user'@'localhost';

FLUSH PRIVILEGES;