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

module.exports = router;

