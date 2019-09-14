const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


/**
 * GET route template
 */
router.get('/', rejectUnauthenticated, (req, res) => {

});

/**
 * POST route template
 */

router.post('/', rejectUnauthenticated, (req, res) => {
    //log the query
    const searchQuery = req.body;
    //looks like we get .search as a key
    console.log('in searchRouter POST', searchQuery.search);

    const googleBooks = `https://www.googleapis.com/books/v1/volumes?q=${searchQuery.search}&key=${process.env.GOOGLE_BOOKS_API_KEY}&maxResults=20`;
    axios.get(googleBooks)
        .then(result => {
            console.log('successful GET from Google Books api');
            res.send(result.data)
        }).catch(error => {
            console.log('error in Google Book GET', error);
            res.sendStatus(500);
        })
});

module.exports = router;

