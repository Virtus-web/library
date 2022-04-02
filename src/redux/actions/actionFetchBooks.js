import { FETCH_BOOKS_LOADING, FETCH_BOOKS_SUCCESS, FETCH_BOOKS_ERROR } from '../constants'
import axios from 'axios'


export const fetchBooksLoading = () => {
    return {
        type: FETCH_BOOKS_LOADING
    }    
}

export const fetchBooksSuccess = data => {
    return {
        type: FETCH_BOOKS_SUCCESS,
        payload: data /* InitialState Object */
    }    
}

export const fetchBooksError = error => {
    return {
        type: FETCH_BOOKS_ERROR,
        payload: error /* InitialState Object */
    }    
}


const GOOGLE_API_KEY = 'AIzaSyB2LTF8YTA3YHNkNKk0p5Bh9rmhjkLnvug'

export const fetchBooks = title => {
    return dispatch => {
        dispatch(fetchBooksLoading())
        axios.get(`https://www.googleapis.com/books/v1/volumes?q=${title}&key=${GOOGLE_API_KEY}&maxResults=20`)
        .then(res => {
            const booksItemArray = res.data.items
            dispatch(fetchBooksSuccess(booksItemArray))
        })
        .catch(error => {
            dispatch(fetchBooksError(error.message))
        })
    }
}
