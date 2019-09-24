import notesReducer from './notesReducer';

describe('testing notesReducer states', () => {
    test('both reducers should have correct initial state', () => {
        let action = {};
        let newState = notesReducer(undefined, action);
        expect(newState).toEqual({ notesForBook: { notes: '', bookId: '' }, notesOpen: false})
    });
    test('notesForBook reducer getting data', () => {
        let action = {
            type: 'SET_BOOK_NOTES',
            payload: {
                notes: 'Book is good! Sci fi, The Expanse',
                bookId: 3
            }
        }
        let newState = notesReducer(undefined, action);
        expect(newState).toEqual({ notesForBook: { notes: 'Book is good! Sci fi, The Expanse', bookId: 3 }, notesOpen: false })
    });
    test('notesOpen reducer getting data and set to true', () => {
        let action = {
            type: 'OPEN_NOTES'
        }
        let newState = notesReducer(undefined, action);
        expect(newState).toEqual({ notesForBook: { notes: '', bookId: '' }, notesOpen: true })
    });
    test('notesOpen setting back to closed/false, from true', () => {
        let action = {
            type: 'CLOSE_NOTES'
        }
        let newState = notesReducer({ notesForBook: { notes: '', bookId: '' }, notesOpen: true }, action);
        expect(newState).toEqual({ notesForBook: { notes: '', bookId: '' }, notesOpen: false })
    });
    test('notesForBook edit case, to edit the note', () => {
        let action = {
            type: 'EDIT_NOTES',
            payload: 'the thing'
        }
        let newState = notesReducer({ notesForBook: { notes: '', bookId: 5 }, notesOpen: true }, action);
        expect(newState).toEqual({ notesForBook: { notes: 'the thing', bookId: 5 }, notesOpen: true })
    })
})