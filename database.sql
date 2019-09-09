
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
    "book_author" varchar(255) NOT NULL,
    "book_image_url" varchar(1023),
    "book_summary" varchar(2046),
    "book_id_on_google" varchar(255) NOT NULL,
    "book_published" DATE NOT NULL,
    "isbn" int,
    "user_id" int NOT NULL,
    "page_total" int NOT NULL,
    "page_on" int,
    "rank" int NOT NULL,
    "notes" varchar(2046) NOT NULL,
    "currently_reading" bool NOT NULL,
    "wish_list" bool NOT NULL,
    "nope_list" bool NOT NULL,
    CONSTRAINT "books_pk" PRIMARY KEY ("id")
);


CREATE TABLE "tags"
(
    "id" serial NOT NULL,
    "tag_name" varchar(50) NOT NULL,
    "user_id" int NOT NULL,
    "book_id" int NOT NULL,
    CONSTRAINT "tags_pk" PRIMARY KEY ("id")
);




CREATE TABLE "friends"
(
    "id" serial NOT NULL,
    "user_id" int NOT NULL,
    "created_friend" varchar(50) NOT NULL,
    "book_id" int NOT NULL,
    CONSTRAINT "friends_pk" PRIMARY KEY ("id")
);




ALTER TABLE "books" ADD CONSTRAINT "books_fk0" FOREIGN KEY ("user_id") REFERENCES "user"("id");

ALTER TABLE "tags" ADD CONSTRAINT "tags_fk0" FOREIGN KEY ("user_id") REFERENCES "user"("id");
ALTER TABLE "tags" ADD CONSTRAINT "tags_fk1" FOREIGN KEY ("book_id") REFERENCES "books"("id");

ALTER TABLE "friends" ADD CONSTRAINT "friends_fk0" FOREIGN KEY ("user_id") REFERENCES "user"("id");
ALTER TABLE "friends" ADD CONSTRAINT "friends_fk1" FOREIGN KEY ("book_id") REFERENCES "books"("id");
