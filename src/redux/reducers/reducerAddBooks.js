import { ADD_BOOKS, DELETE_BOOK, DELETE_ALL_BOOKS } from '../constants'
import { v4 as uuiv4 } from 'uuid'


const initialState = {
    books: []
}

const helperAddData = action => {
    return {
        id: uuiv4(),
        title: action.payload.title,
        author: action.payload.author
    }
}

const helperRemoveDataById = (state, id) => {
    const books = state.filter(book => book.id !== id)
    return books
}


//REDUCER
const reducerAddBooks = (state = initialState.books, action) => {

    if (localStorage.getItem('booksData')) {
        state = JSON.parse(localStorage.getItem('booksData'))
    }

    switch (action.type) {
        case ADD_BOOKS:
            //Attention le fait d'ajouter des curly B ça engendre un objet vide dès le départ dans le state
            state = [...state, helperAddData(action)]
            localStorage.setItem('booksData', JSON.stringify(state))
            return state

        case DELETE_BOOK:
            state = helperRemoveDataById(state, action.payload)
            localStorage.setItem('booksData', JSON.stringify(state))
            return state

        case DELETE_ALL_BOOKS:
            state = []
            localStorage.setItem('booksData', JSON.stringify(state))
            return state

        default: return state
    }
}

export default reducerAddBooks
