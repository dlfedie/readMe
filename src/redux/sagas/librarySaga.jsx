import axios from 'axios';

import { put, takeLatest } from 'redux-saga/effects';

function* addBookToLibrary(action) {
    try {
        yield console.log('in addBookToLibrary saga!');
        yield axios.post('/api/library', action.payload);

        yield put({
            type: 'FETCH_LIBRARY',
        })

    } catch (error) {
        console.log('error in addBookToLibrary POST:', error)
    }
}

function* fetchLibrary(action) {
    try {
        yield console.log('in fetchLibrary GET');
        let fetchResponse = yield axios.get('/api/library');
        yield console.log('fetchLibrary response:', fetchResponse);
        yield put({
            type: 'SET_LIBRARY',
            payload: fetchResponse.data
        })

    } catch(err) {
        console.log('error in fetchLibrary GET:', err);
        
    }
}

function* removeBook(action) {
    try {
        yield console.log('in removeBook DELETE', action.payload.bookIdToDelete);
        yield axios.delete(`/api/library/${action.payload.bookIdToDelete}`);
        yield put({
            type: 'FETCH_LIBRARY'
        });
    } catch(err) {
        console.log('error in removeBook DELETE:', err);
    }
}

function* updateRating(action) {
    try {  
        yield console.log('in updateRating', action.payload);
        yield axios.put('/api/library', action.payload);
        yield put({
            type: 'FETCH_LIBRARY'
        });

    } catch(err) {
        console.log('error in rating update:', err);
    }
}

function* librarySaga() {
    yield takeLatest('ADD_BOOK_TO_LIBRARY', addBookToLibrary);
    yield takeLatest('FETCH_LIBRARY', fetchLibrary);
    yield takeLatest('DELETE_BOOK', removeBook);
    yield takeLatest('UPDATE_RATING', updateRating);
}

export default librarySaga;