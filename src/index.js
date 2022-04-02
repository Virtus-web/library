import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Provider } from 'react-redux'
import store from './redux/store'
import App from './App'


//React 18
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <Provider store={store}>
        <App />
    </Provider>
)

// ReactDOM.render(
//     // <React.StrictMode>
//     <Provider store={store}>
//         <App />
//     </Provider>,
//     // </React.StrictMode>,
//     document.getElementById('root')
// )
