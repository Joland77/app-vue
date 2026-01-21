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

ALTER TABLE users_films
ADD CONSTRAINT pk_users_films PRIMARY KEY (id_users, id_filmUser);

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