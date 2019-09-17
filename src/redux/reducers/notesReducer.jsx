import { combineReducers } from 'redux';


const notesForBook = (state = { notes: '', bookId: ''}, action) => {
    switch (action.type) {
        case 'SET_BOOK_NOTES':
            return action.payload
        case 'EDIT_NOTES':
            return {...state, notes: action.payload}
        default:
            return state
    }
}

const notesOpen = (state = false, action) => {
    switch (action.type) {
        case 'OPEN_NOTES':
            return true
        case 'CLOSE_NOTES':
            return false
        default:
            return state
    }
}

export default combineReducers({
    notesForBook,
    notesOpen,
});
