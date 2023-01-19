import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css'
import Dashboard from './Pages/Dashboard'
import Getstarted from './Pages/Getstarted'
import Signin from './Pages/Signin'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './Pages/Login'


function App() {
  return (
    <div className='App'>
      <Router>
      <Routes>
          <Route path="/" element={<Dashboard/>} />
          <Route exact path="/register" element={<Getstarted/>} />
          <Route  exact path="/login" element={<Login/>} />
      </Routes>
      <ToastContainer />
      </Router>
    </div>
  )
}

export default App
