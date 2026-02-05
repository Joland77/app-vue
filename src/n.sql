CREATE DATABASE exo_vue

CREATE TABLE Genres (
    id SERIAL PRIMARY KEY,
    genre_name VARCHAR(200),
    description_genre TEXT
);

UPDATE films(genre_id) WHERE genre = "Horror" VALUES (1);

ALTER TABLE films
ADD CONSTRAINT fk_genre_id
FOREIGN KEY (genre_id) 
REFERENCES genres_films (id);

INSERT INTO films (title, publication_date, realisateur, genre, genre_id) VALUES
('Minecraft', '02-04-2025', 'Jared Hess', 'Comédie/Aventure', 6);

UPDATE films
SET genre_id = CASE
WHEN id = 1 THEN 2
WHEN id = 2 THEN 1
WHEN id = 3 THEN 1
WHEN id = 4 THEN 3
WHEN id = 5 THEN 4
WHEN id = 6 THEN 5
ELSE genre_id
END
WHERE genre_id IS NULL;

SELECT * FROM films
ORDER BY id ASC;

SELECT * from films
JOIN genres_films ON films.genre_id = genres_films.id;

UPDATE films
SET genre_id = 4
WHERE id = 6;

ALTER TABLE Users
ALTER email SET NOT NULL,
ALTER username SET NOT NULL,
ADD UNIQUE (email),
ADD UNIQUE (username);

ALTER TABLE films
ADD COLUMN note_m INTEGER CHECK (0 <= note_m AND note_m <= 5);

CREATE TABLE users_films (
    id_users INTEGER NOT NULL,
    id_filmUser INTEGER NOT NULL,
    FOREIGN KEY (id_users) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (id_filmUser) REFERENCES films(id) ON DELETE CASCADE
);

ALTER TABLE genres_films
ADD CONSTRAINT uq_genres_films UNIQUE (id_genre, id_film);

DELETE  FROM genres_films WHERE id_film = '1' AND id_genre='10'; 

CREATE TABLE genres_films (
    id_film INTEGER NOT NULL,
    id_genre INTEGER NOT NULL,
    FOREIGN KEY (id_film) REFERENCES films(id) ON DELETE CASCADE,
    FOREIGN KEY (id_genre) REFERENCES genres(id) ON DELETE CASCADE
);

SELECT title, id_film, id_genre, genre_name
FROM films
JOIN genres_films ON genres_films.id_film = films.id
JOIN genres ON genres.id = genres_films.id_genre;

SELECT title, id
FROM films

SELECT username, users.id, title, films.id, genre_name, genres.id
FROM users
JOIN users_films ON users_films.id_users = users.id
JOIN films ON films.id = users_films.id_filmUser
JOIN genres_films ON films.id = genres_films.id_film
JOIN genres ON genres.id = genres_films.id_genre
WHERE username ='Sirdi';

SELECT * FROM users

UPDATE users SET passwords = 'Maxime77s' where username = 'Moulouks'

INSERT INTO users (username, email, passwords, date_of_birth) VALUES
('Sirdi', 'idriss.gallet@gmail.com', 'kiluaestmort', '01/01/2002'),
('Joland', 'chamsdine.tebiz@hotmail.com', 'motdepasse', '07/09/2002');

INSERT INTO genres (genre_name, description_genre) VALUES
('Policier', 'Le film policier est un film relevant du genre policier et, par extension, le genre cinématographique qui regroupe de telles œuvres qui mettent en scène le milieu du crime ou de la police. Le film policier est parfois appelé « polar », par dérivation du surnom initialement adopté pour le roman policier.');

INSERT INTO genres_films (id_film, id_genre) VALUES
(10,8),(10,9);

INSERT INTO users_films (id_users, id_filmuser) VALUES
(3,1),(3,2),(3,3),(3,4),(3,5),(3,6),(3,7),(3,8),(3,9);

SELECT username FROM users WHERE id = 1
SELECT * FROM users_films WHERE id_users = 1

SELECT  users.id, username, id_users, id_filmuser, title, publication_date, realisateur
FROM users
JOIN users_films ON users_films.id_users = users.id
JOIN films ON users_films.id_filmuser = films.id
WHERE users.id = 1

SELECT username, email FROM users

ALTER TABLE users ADD CONSTRAINT uq_email UNIQUE (email);

DELETE FROM users WHERE username = 'Roteimo';

SELECT  users.id, username, id_users, id_filmuser, title, publication_date, realisateur FROM users JOIN users_films ON users_films.id_users = users.id JOIN films ON users_films.id_filmuser = films.id WHERE users.id = 17

SELECT pg_get_serial_sequence('users', 'id');

ALTER SEQUENCE public.users_id_seq RESTART WITH 4

UPDATE films SET slug = 'Titanic' WHERE id = 10;

SELECT * FROM films ORDER BY title

SELECT id FROM films WHERE title = 'Titanic'

DELETE FROM users_films WHERE id_users = 3 AND id_filmuser = 10;