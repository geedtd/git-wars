import * as React from 'react'
import './App.css';
import Popular from './Components/Popular';
import Battle from './Components/Battle';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Nav from './Components/Nav';


class App extends React.Component {
  constructor(prop) {
    super(prop) 

    this.state = {
      theme: "light"
    }

    this.toggleTheme = this.toggleTheme.bind(this)
  }
  toggleTheme() {
    this.setState(({theme}) => ({
      theme: theme === "light" ? "dark" : "light"
    }))
  }

  render() {

    return (
      <Router>
        <div className={this.state.theme}>
          <div className='container'>
          <Nav theme={this.state.theme} toggleTheme={this.toggleTheme}/>
            <Routes>
              <Route path='/' element={<Popular />}/>
              <Route path='/battle' element={<Battle />}/>
            </Routes>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
