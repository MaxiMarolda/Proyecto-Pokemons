import './App.css';
import {BrowserRouter, Route} from "react-router-dom"
import LandingPage from './components/LandingPage';
import Home from './components/Home/Home';
import PokemonCreate from './components/PokemonCreate/PokemonCreate';
import Details from './components/Details/Details'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route exact path='/' component={LandingPage}/>
        <Route path='/home' component={Home}/>
        <Route path='/pokemon/create' component={PokemonCreate}/>
        <Route path='/details/:id' component={Details}/>
      </div>
    </BrowserRouter>
    
  );
}

export default App;
