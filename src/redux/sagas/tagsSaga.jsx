import axios from 'axios';

import { put, takeLatest } from 'redux-saga/effects';

function* searchForTags(action) {
    try {
        yield console.log('in searchForTags, yay!');
        let searchTagsResponse = yield axios.get('/api/tags', action.payload);
        console.log('searchForTags response', searchTagsResponse);

        yield put({
            type: 'SET_TAGS_RESULTS',
            payload: searchTagsResponse
        })

    } catch (error) {
        console.log('error in tag search GET:', error)
    }
}

function* addTag(action) {
    try {
        yield console.log('in addTags', action.payload)
        yield axios.post('/api/tags', action.payload);
        yield put({
            type: 'FETCH_TAGS'
        })
    } catch(error){
        console.log('error in tag POST', error);
        
    }
}

function* tagsSaga() {
    yield takeLatest('FETCH_TAGS', searchForTags);
    yield takeLatest('ADD_TAG', addTag);
}

export default tagsSaga;