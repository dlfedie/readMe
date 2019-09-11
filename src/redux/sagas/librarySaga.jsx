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

function* librarySaga() {
    yield takeLatest('ADD_BOOK_TO_LIBRARY', addBookToLibrary);
    yield takeLatest('FETCH_LIBRARY', fetchLibrary);
}

export default librarySaga;