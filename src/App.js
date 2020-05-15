import React , {Component } from 'react';
import './App.css';
import { BrowserRouter as Router , Switch , Route} from 'react-router-dom'
import Header from './Components/header'
import getForm from './Components/getForm';
import postForm from './Components/postForm';
class App extends Component{
  render(){
    return (
      <Router>
        <div className="App">
          <Header/>
          <Switch>
            <Route path="/get" component={getForm}></Route>
            <Route path="/put" component={postForm}></Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
