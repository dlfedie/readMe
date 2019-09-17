const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


/**
 * GET route template
 */
router.get('/', rejectUnauthenticated, (req, res) => {
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

//specific GET
router.get('/:id', rejectUnauthenticated, (req, res) => {
    const id = req.params.id;
    console.log('in specific ID get:', id);
    const queryText = `SELECT * FROM "books" WHERE "id" = $1;`;
    pool.query(queryText, [id])
        .then(result => {
            res.send(result.rows[0]);
        }).catch(err => {
            console.log('error in specific id GET:', err);
            res.sendStatus(500);
        })
})

//specific NOTES GET
router.get('/notes/:id', rejectUnauthenticated, (req, res) => {
    const id = req.params.id;
    console.log('in notes ID get:', id);
    const queryText = `SELECT * FROM "books" WHERE "id" = $1;`;
    pool.query(queryText, [id])
        .then(result => {
            res.send(result.rows[0]);
        }).catch(err => {
            console.log('error in specific id GET:', err);
            res.sendStatus(500);
        })
})

//PUT for note update
router.put('/notes', rejectUnauthenticated, (req, res) => {
    console.log('attempting to update note:', req.body);
    const bookToUpdate = req.body.bookId;
    const notes = req.body.notes;

    //need to check if user is the correct one; don't need any cross-updating/postman updates to happen.
    const queryCheck = `SELECT * FROM "books" WHERE "id" = $1;`;

    pool.query(queryCheck, [bookToUpdate])
        .then(result => {
            console.log('queryCheck response. book_user_id, req_user_id:', result.rows[0].user_id, req.user.id);

            if (result.rows[0].user_id === req.user.id) {
                const queryText = `UPDATE "books" SET "notes" = $1 WHERE "id" = $2;`;
                pool.query(queryText, [notes, bookToUpdate])
                    .then(result => {
                        res.sendStatus(200);
                    }).catch(err => {
                        console.log('error in rating update try:', err);
                        res.sendStatus(500)
                    })
            } else {
                //user is trying to update a book that's not theirs
                res.sendStatus(403);
            }
        }).catch(err => {
            console.log('error in rating update auth check:', err);
            res.sendStatus(500);
        })
})


/**
 * POST route template
 */
router.post('/', rejectUnauthenticated, (req, res) => {
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

//delete route
router.delete('/:id', rejectUnauthenticated, (req, res) => {
    const bookId = req.params.id;
    console.log('attmpting to delete,', bookId, 'from user:', req.user.id);

    //need to check if user is the correct one; don't need any cross-deleting/postman deletes to happen.
    const queryCheck = `SELECT * FROM "books" WHERE "id" = $1;`;

    pool.query(queryCheck, [bookId])
        .then(result => {
            console.log('queryCheck response. book_user_id, req_user_id:', result.rows[0].user_id, req.user.id);

            if(result.rows[0].user_id === req.user.id) {
                const queryText = `DELETE FROM "books" WHERE "id" = $1;`;
                pool.query(queryText, [bookId])
                    .then(result => {
                        res.sendStatus(204);
                    }).catch(err =>{
                        console.log('error in actual DELETE try:', err);
                        res.sendStatus(500)
                    })
            } else {
                //user is trying to delete a book that's not theirs
                res.sendStatus(403);
            }
            
        }).catch(err => {
            console.log('error in delete auth check:', err);
            res.sendStatus(500);
        })
})

//update rating route
router.put('/rating', rejectUnauthenticated, (req, res) => {
    console.log('attempting to update rating:', req.body);
    const bookToUpdate = req.body.bookId;
    const rating = req.body.value;

    //need to check if user is the correct one; don't need any cross-updating/postman updates to happen.
    const queryCheck = `SELECT * FROM "books" WHERE "id" = $1;`;

    pool.query(queryCheck, [bookToUpdate])
        .then(result => {
            console.log('queryCheck response. book_user_id, req_user_id:', result.rows[0].user_id, req.user.id);

            if (result.rows[0].user_id === req.user.id) {
                const queryText = `UPDATE "books" SET "rating" = $1 WHERE "id" = $2;`;
                pool.query(queryText, [rating, bookToUpdate])
                    .then(result => {
                        res.sendStatus(200);
                    }).catch(err => {
                        console.log('error in rating update try:', err);
                        res.sendStatus(500)
                    })
            } else {
                //user is trying to update a book that's not theirs
                res.sendStatus(403);
            }
        }).catch(err => {
            console.log('error in rating update auth check:', err);
            res.sendStatus(500);
        })
})

//update current status
router.put('/current', rejectUnauthenticated, (req, res) => {
    console.log('attempting to update rating:', req.body);
    const bookToUpdate = req.body.bookId;
    const current = req.body.currently_reading;

    //need to check if user is the correct one; don't need any cross-updating/postman updates to happen.
    const queryCheck = `SELECT * FROM "books" WHERE "id" = $1;`;

    pool.query(queryCheck, [bookToUpdate])
        .then(result => {
            console.log('queryCheck response. book_user_id, req_user_id:', result.rows[0].user_id, req.user.id);

            if (result.rows[0].user_id === req.user.id) {
                const queryText = `UPDATE "books" SET "currently_reading" = $1 WHERE "id" = $2;`;
                pool.query(queryText, [current, bookToUpdate])
                    .then(result => {
                        res.sendStatus(200);
                    }).catch(err => {
                        console.log('error in update currenstatus try:', err);
                        res.sendStatus(500)
                    })
            } else {
                //user is trying to update a book that's not theirs
                res.sendStatus(403);
            }
        }).catch(err => {
            console.log('error in update currenstatus auth check:', err);
            res.sendStatus(500);
        })
})

//update wishlist status
router.put('/wish', rejectUnauthenticated, (req, res) => {
    console.log('attempting to update rating:', req.body);
    const bookToUpdate = req.body.bookId;
    const wish = req.body.wish_list;

    //need to check if user is the correct one; don't need any cross-updating/postman updates to happen.
    const queryCheck = `SELECT * FROM "books" WHERE "id" = $1;`;

    pool.query(queryCheck, [bookToUpdate])
        .then(result => {
            console.log('queryCheck response. book_user_id, req_user_id:', result.rows[0].user_id, req.user.id);

            if (result.rows[0].user_id === req.user.id) {
                const queryText = `UPDATE "books" SET "wish_list" = $1 WHERE "id" = $2;`;
                pool.query(queryText, [wish, bookToUpdate])
                    .then(result => {
                        res.sendStatus(200);
                    }).catch(err => {
                        console.log('error in update wishlist try:', err);
                        res.sendStatus(500)
                    })
            } else {
                //user is trying to update a book that's not theirs
                res.sendStatus(403);
            }
        }).catch(err => {
            console.log('error in update wishlist check:', err);
            res.sendStatus(500);
        })
})

//update current status
router.put('/nope', rejectUnauthenticated, (req, res) => {
    console.log('attempting to update rating:', req.body);
    const bookToUpdate = req.body.bookId;
    const nope = req.body.nope_list;

    //need to check if user is the correct one; don't need any cross-updating/postman updates to happen.
    const queryCheck = `SELECT * FROM "books" WHERE "id" = $1;`;

    pool.query(queryCheck, [bookToUpdate])
        .then(result => {
            console.log('queryCheck response. book_user_id, req_user_id:', result.rows[0].user_id, req.user.id);

            if (result.rows[0].user_id === req.user.id) {
                const queryText = `UPDATE "books" SET "nope_list" = $1 WHERE "id" = $2;`;
                pool.query(queryText, [nope, bookToUpdate])
                    .then(result => {
                        res.sendStatus(200);
                    }).catch(err => {
                        console.log('error in update NOPElist try:', err);
                        res.sendStatus(500)
                    })
            } else {
                //user is trying to update a book that's not theirs
                res.sendStatus(403);
            }
        }).catch(err => {
            console.log('error in update NOPElist check:', err);
            res.sendStatus(500);
        })
})


module.exports = router;