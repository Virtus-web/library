import { BrowserRouter, Route, Switch } from 'react-router-dom'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import AddBooks from './containers/AddBooks'
import SearchBooks from './containers/SearchBooks'


function App() {
    return (
        <BrowserRouter>
            <NavBar />
            <Switch>
                <Route exact path="/" component={AddBooks} />
                <Route path="/search" component={SearchBooks} />
            </Switch>
            <Footer />
        </BrowserRouter>
    )
}

export default App;
