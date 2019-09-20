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
        // yield put({
        //     type: 'FETCH_LIBRARY'
        // })
        // yield put({
        //     type: 'FETCH_WISH_LIST'
        // })
    } catch(error){
        console.log('error in tag POST', error);
    }
}

function* removeTag(action) {
    try {
        yield console.log('in removeTag', action.payload);
        yield axios.delete(`/api/tags/${action.payload.tagId}`);
        yield put({
            type: 'FETCH_TAGS'
        })
        
    } catch(err) {
        console.log('error in tag DELETE');
    }
}

function* updateTag(action) {
    try {
        yield console.log('in editTag:', action.payload);
        // let tagId = action.payload.tagId
        yield axios.put('/api/tags', action.payload);
        yield put({
            type: 'FETCH_TAGS'
        })
        // yield put({
        //     type: 'FETCH_LIBRARY'
        // })
        // yield put({
        //     type: 'FETCH_WISH_LIST'
        // })

    } catch (err) {
        console.log('error in editNotes:', err);
    }
}



function* tagsSaga() {
    yield takeLatest('FETCH_TAGS', searchForTags);
    yield takeLatest('ADD_TAG', addTag);
    yield takeLatest('REMOVE_TAG', removeTag);
    yield takeLatest('UPDATE_TAG', updateTag);
}

export default tagsSaga;