import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addBook, deleteBook, deleteAllBooks } from '../redux/actions/actionAddBooks'
import FlipMove from 'react-flip-move'


const AddBooks = () => {
    //Avec connect on peut accéder aux props de Redux et donc écrire en destructuring { libraryData } déclarée en tant que propriété de addStateToProps()
    //Idem pour l'action passée via addDispatchToProps à part qu'on ne donne pas de nouveau nom à une éventuelle propriété de la fonction on passe direct via useDispatch(action(useState)). Mais sinon avec connect on passerait cette action via une propriété déclzrée dans addDispatchToProps dans les props desctructurées de ce composant.
    // console.log(props)

    const libraryData = useSelector((state) => state.library)
    // console.log(libraryData)
    const dispatch = useDispatch()

    const initialState = {
        title: '',
        author: ''
    }

    const [ newData, setNewData ] = useState(initialState)
    
    const handleSubmit = (e) => {
        e.preventDefault()
        // console.log(newData)
        dispatch(addBook(newData))
        // vider le input
        setNewData(initialState)
    }

    //Ici pour le projet 13
    const displayData = libraryData.length > 0 ?
    <FlipMove>
        {
            libraryData.map((data) => {
                return (
                    <li key={data.id} className='list-group-item list-group-light d-flex justify-content-between'>
                        <span><strong>Titre: </strong>{data.title}</span>              
                        <span><strong>Auteur: </strong>{data.author}</span>
                        <span
                        className='btn btn-danger'
                        onClick={() => dispatch(deleteBook(data.id))}
                        >X</span>             
                    </li>
                )
            })
        }
    </FlipMove>
    : <p className='text-center'>Aucune data à afficher</p>

    const deleteAllBooksBtn = libraryData.length > 0 &&
        <div className='d-flex justify-content-center'>
            <button className='btn btn-danger mt-4 mb-5' onClick={() => dispatch(deleteAllBooks())}>Effacer tous les livres</button>
        </div>

    return (
        <main role='main'>
            <div className='jumbotron jumbotron-fluid'>
                <div className='container text-center'>
                    <h1 className='display-4'>BOOKS</h1>
                    <p>Ajouter un livre à votre bibliothèque</p>
                    
                    <form className='form-inline d-flex justify-content-around mb-5' onSubmit={handleSubmit}>
                        <div className='form-group'>
                            <input
                                value={newData.title}
                                type='text'
                                className='form-control'
                                placeholder='Titre'
                                required
                                onChange={(e) => setNewData({...newData, title: e.target.value})}
                            />
                        </div>
                        <div className='form-group ml-3'>
                            <input
                                value={newData.author}
                                type='text'
                                className='form-control'
                                placeholder='Auteur'
                                required
                                onChange={(e) => setNewData({...newData, author: e.target.value})}
                            />
                        </div>
                        <div className='form-group ml-3'>
                            <button
                            className='btn btn-outline-secondary'
                            >Ajouter un livre</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className='container' style={{minHeight:'200px'}}>

                <div className='row'>
                    <div className='col-md-12'>
                        <ul className='list-group'>
                            {displayData}
                        </ul>
                         { deleteAllBooksBtn }
                    </div>
                </div>

            </div>
        </main>
    )
}

export default AddBooks
