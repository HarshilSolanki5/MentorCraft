import './App.css';
import {Routes, Route} from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import axios from 'axios';
import {Toaster} from 'react-hot-toast';
import Dashboard from './pages/Dashboard';
import { UserContextProvider } from './context/usercontext';

// axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.withCredentials = true

function App() {
  return (
    <div className="App">
      <UserContextProvider>
      <Navbar />
      <Toaster position = 'bottom-right' toastOptions={{duration: 2000}} />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='dashboard' element={<Dashboard />}/>
      </Routes>
      </UserContextProvider>
    </div>
  );
}

export default App;
