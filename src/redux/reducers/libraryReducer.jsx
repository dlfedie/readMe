import { combineReducers } from 'redux';


const libraryReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_LIBRARY':
            return action.payload;
        default:
            return state;
    }
};

const detailsReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_DETAILS':
            return action.payload
        default:
            return state
    }
}

const editBookReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_EDITS':
            return action.payload
        default:
            return state
    }
}

const bookOnReducer = (state = '', action) => {
    switch (action.type) {
        case 'SET_BOOK_CLICKED':
            return action.payload
        default:
            return state
    }
}

// const notesForBook = (state = '', action) => {
//     switch (action.type) {
//         case 'SET_BOOK_NOTES':
//             return action.payload.notes
//         default:
//             return state
//     }
// }


export default combineReducers({
    libraryReducer,
    detailsReducer,
    bookOnReducer,
    editBookReducer,
});
