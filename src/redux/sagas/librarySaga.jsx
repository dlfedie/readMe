import axios from 'axios';

import { put, takeLatest } from 'redux-saga/effects';

function* addBookToLibrary(action) {
    try {
        yield console.log('in addBookToLibrary saga!');
        yield axios.post('/api/library', action.payload);

        // yield put({
        //     type: 'GET_LIBRARY',
        // })

    } catch (error) {
        console.log('error in addBookToLibrary POST:', error)
    }
}

function* librarySaga() {
    yield takeLatest('ADD_BOOK_TO_LIBRARY', addBookToLibrary)
}

export default librarySaga;