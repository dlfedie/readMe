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
router.get('/details/:id', rejectUnauthenticated, (req, res) => {
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

router.get('/wishlist', rejectUnauthenticated, (req, res) => {
    console.log('in library wishlist GET');
    //go get all books in user's wishlist in DB
    const queryText = `SELECT * FROM "books" WHERE "user_id" = $1 AND "wish_list" = TRUE ORDER BY "wish_rank" DESC;`;
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


//specific GET for an edit page change (mainly only after updating a note)
//bailed on this, as it was having issues updating redux/etc. i'll just have the note on the page stay wrong; user sees edited note after update
// router.get('/edit/:id', rejectUnauthenticated, (req, res) => {
//     const id = req.params.id;
//     console.log('in edit ID get:', id);
//     const queryText = `SELECT * FROM "books" WHERE "id" = $1;`;
//     pool.query(queryText, [id])
//         .then(result => {
//             res.send(result.rows[0]);
//         }).catch(err => {
//             console.log('error in edit id GET:', err);
//             res.sendStatus(500);
//         })
// })

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


//rankup wish PUT
router.put('/rankupwish', rejectUnauthenticated, (req, res) => {
    console.log('attempting to update wish rank of id:', req.body);
    const bookToUpdate = req.body.bookId;

    //need to check if user is the correct one; don't need any cross-updating/postman updates to happen.
    const queryCheck = `SELECT * FROM "books" WHERE "id" = $1;`;

    pool.query(queryCheck, [bookToUpdate])
        .then(result => {
            console.log('queryCheck response. book_user_id, req_user_id:', result.rows[0].user_id, req.user.id);

            if (result.rows[0].user_id === req.user.id) {
                const queryText = `UPDATE "books" SET "wish_rank" = wish_rank + 1 WHERE "id" = $1;`;
                pool.query(queryText, [bookToUpdate])
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



//rankdown wish PUT
router.put('/rankdownwish', rejectUnauthenticated, (req, res) => {
    console.log('attempting to update down the wish rank of id:', req.body);
    const bookToUpdate = req.body.bookId;

    //need to check if user is the correct one; don't need any cross-updating/postman updates to happen.
    const queryCheck = `SELECT * FROM "books" WHERE "id" = $1;`;

    pool.query(queryCheck, [bookToUpdate])
        .then(result => {
            console.log('queryCheck response. book_user_id, req_user_id:', result.rows[0].user_id, req.user.id);

            if (result.rows[0].user_id === req.user.id) {
                const queryText = `UPDATE "books" SET "wish_rank" = wish_rank - 1 WHERE "id" = $1;`;
                pool.query(queryText, [bookToUpdate])
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

//update from edit page route
router.put('/edit', rejectUnauthenticated, (req, res) => {
    console.log('attempting to update rating:', req.body);
    const bookToUpdate = req.body.bookId;
    const rating = req.body.value;
    const currently_reading = req.body.currently_reading;
    const wish_list = req.body.wish_list;
    const nope_list = req.body.nope_list;

    //need to check if user is the correct one; don't need any cross-updating/postman updates to happen.
    const queryCheck = `SELECT * FROM "books" WHERE "id" = $1;`;

    pool.query(queryCheck, [bookToUpdate])
        .then(result => {
            console.log('queryCheck response. book_user_id, req_user_id:', result.rows[0].user_id, req.user.id);

            if (result.rows[0].user_id === req.user.id) {
                const queryText = `UPDATE "books" SET "rating" = $1, "currently_reading" = $2, "wish_list" = $3, "nope_list" = $4 WHERE "id" = $5;`;
                pool.query(queryText, [rating, currently_reading, wish_list, nope_list, bookToUpdate])
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

module.exports = router;