import * as React from 'react'
import './App.css';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Nav from './Components/Nav';
import Loading from './Components/Loading'

const  Battle = React.lazy(() => import('./Components/Battle'))
const  Popular= React.lazy(() => import('./Components/Popular'))
const  Results= React.lazy(() =>  import('./Components/Results'))


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
          <React.Suspense fallback={<Loading />}>
            <Routes>
              <Route path='/' element={<Popular />}/>
              <Route path='/battle' element={<Battle />}/>
              <Route path='/results' element={<Results/>}/>
            </Routes>
          </React.Suspense>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
