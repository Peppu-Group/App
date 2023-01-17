import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css'
import Dashboard from './Pages/Dashboard'
import Getstarted from './Pages/Getstarted'
import Login from './Pages/Login'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className='App'>
      <Router>
      <Routes>
          <Route path="/" element={<Dashboard/>} />
          <Route exact path="/register" element={<Getstarted/>} />
          <Route exact path="/Login" element={<Login/>} />
      </Routes>
      <ToastContainer />
      </Router>
    </div>
  )
}

export default App
