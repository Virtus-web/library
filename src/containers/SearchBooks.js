import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { fetchBooks } from '../redux/actions/actionFetchBooks'
import { addBook } from '../redux/actions/actionAddBooks'

toast.configure()


function SearchBooks() {

    //Méthode utlisée cette fois par DonkeyGeek et il nomme le useSelector simplement state et non un random name
    const state = useSelector((state) => state.search)
    // console.log(state)
    const dispatch = useDispatch()

    const [ title, setTitle ] = useState('')
    
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(fetchBooks(title))
    }
    
    const handleSave = (title, author) => {
        //Ici les paramètres sont des valeurs de propriétés d'objet mais la clé et la valeur ayant le même nom on peut mettre juste la clé
        const bookToSave = { title, author }
        dispatch(addBook(bookToSave))
        toast.info('Livre enregistré', { position: toast.POSITION.BOTTOM_RIGHT })
    }

    const displayFetchedBooks = state.isLoading ? (
            <div className='d-flex justify-content-center'>
                <div className='spinner-border text-info' role='status'>
                    <span className='sr-only'></span>
                </div>
            </div>
        )
        : state.error !== '' ? (
            <p>{state.error}</p>
        )
        :
        (
            state.fetchedBooks.map(data => {
                return (
                    <div key={data.id} className="card mb-2">

                        <div className="card-header">
                            <h5 className='mb-0'>
                                <button
                                data-bs-toggle="collapse"
                                data-bs-target={`#A${data.id}`}
                                // data-toggle='collapse'
                                // data-target={`#${data.id}`}
                                className='btn btn-link collapsed'
                                aria-expanded='false'
                                // aria-controls='#accordion'
                                >{data.volumeInfo.title}</button>
                            </h5>                            
                        </div>

                        <div id={`A${data.id}`} className="collapse mb-3" data-parent="#accordion">
                            <div className="card-body">
                                {
                                    data.volumeInfo.hasOwnProperty('imageLinks') &&
                                    <img src={data.volumeInfo.imageLinks.thumbnail} alt={data.volumeInfo.title} />
                                }
                                <br />
                                <h4 className='card-title'>Titre: {data.volumeInfo.title}</h4>
                                <h5 className='card-title'>Auteur: {data.volumeInfo.authors}</h5>
                                <p className='card-text'>Description: {data.volumeInfo.description}</p>
                                <a
                                className='btn btn-outline-secondary'
                                target="_blank"
                                rel='noopener noreferrer'
                                href={data.volumeInfo.previewLink}
                                >Plus d'infos</a>
                                <button
                                className='btn btn-outline-primary ml-3'
                                onClick={() => handleSave(data.volumeInfo.title, data.volumeInfo.authors)}
                                >
                                Enregistrer
                                </button>
                            </div>
                        </div>
                        
                    </div>
                )
            })
        )

    return (
        <main role='main'>
            <div className='jumbotron jumbotron-fluid'>
                <div className='container text-center'>
                    <h1 className='display-4'>BOOKS</h1>
                    <p>Indiquer le sujet du livre à rechercher dans Google API</p>
                    
                    <form className='form-inline d-flex justify-content-around mb-5' onSubmit={handleSubmit}>
                        <div className='form-group'>
                            <input
                                value={title}
                                type='text'
                                className='form-control'
                                placeholder='Quoi rechercher ?'
                                required
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className='form-group ml-3'>
                            <button
                            className='btn btn-outline-secondary'
                            >Rechercher</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className='container' style={{minHeight:'200px'}}>
                <div id='accordion'>
                    {displayFetchedBooks}
                </div>
            </div>
        </main>
    )
}

export default SearchBooks
