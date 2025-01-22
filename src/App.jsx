// library imports
import './App.css'

import {Route,Routes} from 'react-router-dom'
import Home from './pages/Home'
import AboutUs from './pages/AboutUs'
import NotFound from "./pages/NotFound";
import Signup from './pages/Signup';
import Login from './pages/Login';
import Courses from './pages/Courses';
import ContactUs from './pages/ContactUs';

function App() {


  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path='/about' element={<AboutUs/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/courses' element={<Courses/>}/>
        <Route path='/contact' element={<ContactUs/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>

      
    </>
  )
}

export default App
