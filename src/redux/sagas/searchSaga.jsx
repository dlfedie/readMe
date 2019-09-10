import axios from 'axios';

import { put, takeLatest } from 'redux-saga/effects';

function* searchForBooks(action) {
    try {
        yield console.log('in searchSaga, yay!');
        let searchResponse = yield axios.post('/api/search', action.payload);
        console.log('searchForBooks response', searchResponse);
        
        yield put({
            type: 'SET_SEARCH_RESULTS',
            payload: searchResponse
        })

    } catch(error) {
        console.log('error in search GET:', error)
    }
}

function* searchSaga() {
    yield takeLatest('SEARCH_FOR_BOOKS', searchForBooks)
}

export default searchSaga;