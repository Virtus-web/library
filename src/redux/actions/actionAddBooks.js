import { ADD_BOOKS, DELETE_BOOK, DELETE_ALL_BOOKS } from '../constants'


export const addBook = data => {
    return {
        type: ADD_BOOKS,
        payload: data /* InitialState Object */
    }    
}

export const deleteBook = id => {
    return {
        type: DELETE_BOOK,
        payload: id /* InitialState Object */
    }    
}

export const deleteAllBooks = () => {
    return {
        type: DELETE_ALL_BOOKS
    }    
}
