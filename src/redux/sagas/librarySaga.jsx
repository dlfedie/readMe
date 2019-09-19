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

//this now catches all updates
function* updateEditPage(action) {
    try {  
        yield console.log('in updateEditPage', action.payload);
        yield axios.put('/api/library/edit', action.payload);
        yield put({
            type: 'FETCH_LIBRARY'
        });
        yield put({
            type: 'FETCH_WISH_LIST'
        })
    } catch(err) {
        console.log('error in rating update:', err);
    }
}

// function* updateCurrent(action) {
//     try {
//         yield console.log('in updateCurrent', action.payload);
//         yield axios.put('/api/library/current', action.payload);
//         yield put({
//             type: 'FETCH_LIBRARY'
//         })
//     } catch(err) {
//         console.log('error in updateCurrent:', err);
//     }
// }

// function* updateWish(action) {
//     try {
//         yield console.log('in updateWish', action.payload);
//         yield axios.put('/api/library/wish', action.payload);
//         yield put({
//             type: 'FETCH_LIBRARY'
//         })
//     } catch (err) {
//         console.log('error in updateWish:', err);
//     }
// }

// function* updateNope(action) {
//     try {
//         yield console.log('in updateNope', action.payload);
//         yield axios.put('/api/library/nope', action.payload);
//         yield put({
//             type: 'FETCH_LIBRARY'
//         })
//     } catch (err) {
//         console.log('error in updateNope:', err);
//     }
// }

function* getDetails(action) {
    try {
        yield console.log('in getDetails:', action.payload);
        let getDetailsResponse = yield axios.get(`/api/library/details/${action.payload}`);
        yield put({
            type: 'SET_DETAILS',
            payload: getDetailsResponse.data
        })
    } catch(err) {
        console.log('error in getDetails:', err);
    }
}

function* getNotes(action) {
    try {
        yield console.log('in getNotes:', action.payload);
        let getNotesResponse = yield axios.get(`/api/library/notes/${action.payload}`);
        yield put({
            type: 'SET_BOOK_NOTES',
            payload: getNotesResponse.data
        })
    } catch(err) {
        console.log('error in getNotes', err)
    }
}

function* updateNotes(action) {
    try {
        yield console.log('in editNotes:', action.payload);
        let bookId = action.payload.bookId
        yield axios.put('/api/library/notes', action.payload);
        yield put({
            type: 'GET_NOTES',
            payload: bookId
        })
        yield put({
            type: 'FETCH_LIBRARY'
        })
        
    } catch(err) {
        console.log('error in editNotes:', err);
    }
}

function* fetchWishList(action) {
    try {
        yield console.log('in fetchWishList:', action.payload);
        let fetchResponse = yield axios.get('/api/library/wishlist');
        yield put({
            type: 'SET_WISH_LIST',
            payload: fetchResponse.data
        })
    } catch(err) {
        console.log('error in fetchWishList:', err);
    }
}

function* rankUpWish(action) {
    try {
        yield console.log('in rankUpWish', action.payload);
        yield axios.put('/api/library/rankupwish', {bookId: action.payload});
        yield put({
            type: 'FETCH_WISH_LIST'
        })
    } catch(err) {
        console.log('error in rankUpWish', err);
    }
}

function* rankDownWish(action) {
    try {
        yield console.log('in rankDownWish', action.payload);
        yield axios.put('/api/library/rankdownwish', { bookId: action.payload });
        yield put({
            type: 'FETCH_WISH_LIST'
        })
    } catch (err) {
        console.log('error in rankDownWish', err);
    }
}


//this was supposed to set the edit page after updaing a note (edit page shows note in full).. it's not working, so not going to worry now.
// function* fetchEdits(action) {
//     try {
//         yield console.log('in fetchEdits', action.payload.id);
//         let getEditsResponse = yield axios.get(`/api/library/edit/${action.payload.id}`);
//         yield put({
//             type: 'SET_EDITS',
//             payload: getEditsResponse
//         })
        
//     } catch(err) {
//         console.log('error in fetchEdits:', err);
        
//     }
// }

function* librarySaga() {
    yield takeLatest('ADD_BOOK_TO_LIBRARY', addBookToLibrary);
    yield takeLatest('FETCH_LIBRARY', fetchLibrary);
    yield takeLatest('DELETE_BOOK', removeBook);
    yield takeLatest('UPDATE_EDIT_PAGE', updateEditPage);
    yield takeLatest('GET_DETAILS', getDetails);
    // yield takeLatest('UPDATE_CURRENT', updateCurrent);
    // yield takeLatest('UPDATE_WISH', updateWish);
    // yield takeLatest('UPDATE_NOPE', updateNope);
    yield takeLatest('GET_NOTES', getNotes);
    yield takeLatest('UPDATE_NOTES', updateNotes);
    yield takeLatest('FETCH_WISH_LIST', fetchWishList);
    yield takeLatest('RANK_UP_WISH', rankUpWish);
    yield takeLatest('RANK_DOWN_WISH', rankDownWish);
    // yield takeLatest('FETCH_EDITS', fetchEdits);
}

export default librarySaga;