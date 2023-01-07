import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css'
import Dashboard from './Pages/Dashboard'

function App() {
  return (
    <div className='App'>
      <Router>
      <Routes>
          <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
      </Router>
    </div>
  )
}

export default App
