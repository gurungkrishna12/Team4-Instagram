import React, {Component} from 'react'
import './App.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Landing from './components/Landing';

class App extends Component {

  render() {
    return(
      <div className="App">
        <Navbar />
        <Landing />
        <Footer />
      </div>
    );
  }


}


export default App;
