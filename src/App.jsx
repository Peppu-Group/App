import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css'
import Dashboard from './Pages/Dashboard'
import Getstarted from './Pages/Getstarted'
import Signin from './Pages/Signin'

function App() {
  return (
    <div className='App'>
      <Router>
      <Routes>
          <Route path="/" element={<Dashboard/>} />
          <Route exact path="/login" element={<Getstarted/>} />
          <Route  exact path="/signin" element={<Signin/>} />
      </Routes>
      </Router>
    </div>
  )
}

export default App
