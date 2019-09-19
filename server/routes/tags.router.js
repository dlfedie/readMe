const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


/**
 * GET route template
 */
router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('in tags full GET');
    //go get all books in user's library in DB
    const queryText = `SELECT * FROM "tags" WHERE "user_id" = $1 ORDER BY "tag_name" ASC;`;
    const user = req.user.id;
    pool.query(queryText, [user])
        .then(result => {
            console.log('successful user tags GET', result.rows);
            res.send(result.rows);
        }).catch(err => {
            console.log('error in tags GET:', err);
            res.sendStatus(500);
        })
});

/**
 * POST route template
 */

router.post('/', rejectUnauthenticated, (req, res) => {
    const tagToAdd = req.body;
    console.log('in tags POST', tagToAdd);
    const queryText = `INSERT INTO "tags" ("tag_name", "user_id") VALUES ($1, $2);`;
    const user = req.user.id;

    pool.query(queryText, [tagToAdd.addTag, user])
        .then(result => {
            console.log('successful add in tags POST');
            res.sendStatus(201);
        }).catch(err => {
            console.log('error in tags POST', err);
            res.sendStatus(500);
        })
});

//delete route
router.delete('/:id', rejectUnauthenticated, (req, res) => {
    const tagId = req.params.id;
    console.log('attmpting to delete tag,', tagId, 'from user:', req.user.id);

    //need to check if user is the correct one; don't need any cross-deleting/postman deletes to happen.
    const queryCheck = `SELECT * FROM "tags" WHERE "id" = $1;`;

    pool.query(queryCheck, [tagId])
        .then(result => {
            console.log('queryCheck response. user_id, req_user_id:', result.rows[0].user_id, req.user.id);

            if (result.rows[0].user_id === req.user.id) {
                const queryText = `DELETE FROM "tags" WHERE "id" = $1;`;
                pool.query(queryText, [tagId])
                    .then(result => {
                        res.sendStatus(204);
                    }).catch(err => {
                        console.log('error in tag DELETE try:', err);
                        res.sendStatus(500)
                    })
            } else {
                //user is trying to delete a tag that's not theirs
                res.sendStatus(403);
            }

        }).catch(err => {
            console.log('error in delete tag auth check:', err);
            res.sendStatus(500);
        })
})

//tags PUT
router.put('/', rejectUnauthenticated, (req, res) => {
    console.log('attempting to update the tag:', req.body);
    const tagToUpdate = req.body.tagId;
    const tagEdit = req.body.editTag;

    //need to check if user is the correct one; don't need any cross-updating/postman updates to happen.
    const queryCheck = `SELECT * FROM "tags" WHERE "id" = $1;`;

    pool.query(queryCheck, [tagToUpdate])
        .then(result => {
            console.log('queryCheck response. user_id, req_user_id:', result.rows[0].user_id, req.user.id);

            if (result.rows[0].user_id === req.user.id) {
                const queryText = `UPDATE "tags" SET "tag_name" = $1 WHERE "id" = $2;`;
                pool.query(queryText, [tagEdit, tagToUpdate])
                    .then(result => {
                        res.sendStatus(200);
                    }).catch(err => {
                        console.log('error in tag update try:', err);
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

