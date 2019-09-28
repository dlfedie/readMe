
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

CREATE TABLE "user"
(
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "name" VARCHAR (80),
    "admin" BOOLEAN DEFAULT FALSE
);


CREATE TABLE "books"
(
    "id" serial NOT NULL,
    "book_title" varchar(255) NOT NULL,
    "book_subtitle" varchar(255),
    "book_author" varchar(255) NOT NULL,
    "book_image_url" varchar(1023),
    "book_summary" varchar(6000),
    "book_id_on_google" varchar(255) NOT NULL,
    "book_published" varchar(50) NOT NULL,
    "user_id" int NOT NULL REFERENCES "user"("id"),
    "page_total" int NOT NULL,
    "page_on" int,
    "rating" int DEFAULT 0,
    "notes" varchar(2046),
    "currently_reading" BOOLEAN DEFAULT FALSE,
    "wish_list" BOOLEAN DEFAULT FALSE,
    "nope_list" BOOLEAN DEFAULT FALSE,
    "wish_rank" int DEFAULT 0
);


CREATE TABLE "tags"
(
    "id" serial NOT NULL,
    "tag_name" varchar(30) NOT NULL,
    "user_id" int NOT NULL,
);









