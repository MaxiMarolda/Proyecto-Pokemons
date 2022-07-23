import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom"
import LandingPage from './components/LandingPage';
import Home from './components/Home/Home';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route exact path='/' component={LandingPage}/>
        <Route path='/home' component={Home}/>
      </div>
    </BrowserRouter>
    
  );
}

export default App;
