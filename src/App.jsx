
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Route, Routes } from 'react-router-dom';
import Login from './companents/Login/Login';
import Home from './companents/Home/Home';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'boxicons/css/boxicons.min.css';
import Settings from './companents/Settings/Settings';

import Dashboard from './companents/Dashboard';
import Brands from './companents/Brands/Brands';
import Models from './companents/Models/Models';


function App() {
  let tokenxon = localStorage.getItem("token")
  const navigate = useNavigate()
  useEffect(() => {
    if (!tokenxon === "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ey") {
      navigate("/login")
    }
  }, [])
  return (

    <>
      <Routes>

        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Home />} >
          <Route path='/main' element={<Dashboard />} />
          <Route path='/settings' element={<Settings />} />
          <Route path='/brands' element={<Brands />} />
          <Route path='/models' element={<Models />} />
        </Route>

      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
