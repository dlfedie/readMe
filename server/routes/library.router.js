const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
    console.log('in library full GET');
    //go get all books in user's library in DB
    const queryText = `SELECT * FROM "books" WHERE "user_id" = $1 ORDER BY "book_title" ASC;`;
    const user = req.user.id;
    pool.query(queryText, [user])
        .then(result => {
            console.log('successful user library GET', result.rows);
            res.send(result.rows);
        }).catch(err => {
            console.log('error in library GET:', err);
            res.sendStatus(500);
        })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
    const newBook = req.body;
    const user = req.user.id;
    //log what we get, see if still an object
    console.log('library POST:', newBook);
    const queryText = `INSERT INTO "books" ("book_title", "book_subtitle", "book_author", "book_image_url", "book_summary", "book_id_on_google", "book_published", "user_id", "page_total")
                                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);`;
    //authors come to us as an array, I'm going to combine them if they have more than one
    const authors = newBook.volumeInfo.authors;
    let combinedAuthors = '';
    if (newBook.volumeInfo.authors[1]) {
        combinedAuthors = authors.join(', ');
    } else {
        combinedAuthors = newBook.volumeInfo.authors[0];
    }
    pool.query(queryText, [newBook.volumeInfo.title, newBook.volumeInfo.subtitle, combinedAuthors, newBook.volumeInfo.imageLinks.smallThumbnail, newBook.volumeInfo.description, newBook.id, newBook.volumeInfo.publishedDate, user, newBook.volumeInfo.pageCount])
        .then(result => {
            console.log('successful add in library POST');
            res.sendStatus(201);
        }).catch(err => {
            console.log('error in library POST', err);
            res.sendStatus(500);
        })
});

module.exports = router;