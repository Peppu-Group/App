import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css'
import Dashboard from './Pages/Dashboard'
import Getstarted from './Pages/Getstarted'

function App() {
  return (
    <div className='App'>
      <Router>
      <Routes>
          <Route path="/" element={<Dashboard/>} />
          <Route exact path="/login" element={<Getstarted/>} />
      </Routes>
      </Router>
    </div>
  )
}

export default App