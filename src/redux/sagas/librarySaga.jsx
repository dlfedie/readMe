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
        yield axios.put('/api/library/rating', action.payload);
        yield put({
            type: 'FETCH_LIBRARY'
        });
    } catch(err) {
        console.log('error in rating update:', err);
    }
}

function* updateCurrent(action) {
    try {
        yield console.log('in updateCurrent', action.payload);
        yield axios.put('/api/library/current', action.payload);
        yield put({
            type: 'FETCH_LIBRARY'
        })
    } catch(err) {
        console.log('error in updateCurrent:', err);
    }
}

function* updateWish(action) {
    try {
        yield console.log('in updateWish', action.payload);
        yield axios.put('/api/library/wish', action.payload);
        yield put({
            type: 'FETCH_LIBRARY'
        })
    } catch (err) {
        console.log('error in updateWish:', err);
    }
}

function* updateNope(action) {
    try {
        yield console.log('in updateNope', action.payload);
        yield axios.put('/api/library/nope', action.payload);
        yield put({
            type: 'FETCH_LIBRARY'
        })
    } catch (err) {
        console.log('error in updateNope:', err);
    }
}

function* getDetails(action) {
    try {
        yield console.log('in getDetails:', action.payload);
        let getDetailsResponse = yield axios.get(`/api/library/${action.payload}`);
        yield put({
            type: 'SET_DETAILS',
            payload: getDetailsResponse.data
        })
    } catch(err) {
        console.log('error in getDetails:', err);
    }
}

function* librarySaga() {
    yield takeLatest('ADD_BOOK_TO_LIBRARY', addBookToLibrary);
    yield takeLatest('FETCH_LIBRARY', fetchLibrary);
    yield takeLatest('DELETE_BOOK', removeBook);
    yield takeLatest('UPDATE_RATING', updateRating);
    yield takeLatest('GET_DETAILS', getDetails);
    yield takeLatest('UPDATE_CURRENT', updateCurrent);
    yield takeLatest('UPDATE_WISH', updateWish);
    yield takeLatest('UPDATE_NOPE', updateNope);
    
}

export default librarySaga;