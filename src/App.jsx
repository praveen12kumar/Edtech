// library imports
import './App.css'

import {Route,Routes} from 'react-router-dom'
import Home from './pages/Home'
import AboutUs from './pages/AboutUs'
import NotFound from "./pages/NotFound";
import Signup from './pages/Signup';
import Login from './pages/Login';
import Courses from './pages/course/Courses';
import ContactUs from './pages/ContactUs';
import Denied from './pages/Denied';
import CourseDescription from './pages/course/CourseDescription';
import RequireAuth from './Auth/RequireAuth';
import CreateCourse from './pages/course/CreateCourse';
import Profile from './pages/user/Profile';
import EditProfile from './pages/user/EditProfile';
import Checkout from './pages/payment/Checkout';
import CheckoutFailure from './pages/payment/ChekoutFailure';
import CheckoutSuccess from './pages/payment/CheckoutSuccess';
import DisplayLectures from './pages/dashboard/DisplayLecture';
import AddLecture from './pages/dashboard/AddLecture';

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
        <Route path='/denied' element={<Denied/>}/>

        <Route path='/course/description' element={<CourseDescription/>}/>
        <Route path="*" element={<NotFound/>}/>

      //-------------Admin-----------------------
        <Route element={<RequireAuth allowedRoles={['ADMIN']}/>}>
            <Route path='/course/create' element={<CreateCourse/>}/>
            <Route path='/course/addlecture' element={<AddLecture/>}/>
        </Route>

        {/* <Route element={<RequireAuth allowedRoles={['ADMIN','USER']}/>}>
          <Route path='/user/profile' element={<Profile/>}/>
          <Route path='/user/edit-profile' element={<EditProfile/>}/>
          <Route path='/checkout' element={<Checkout/>}/>
          <Route path='/checkout/success' element={<CheckoutSuccess/>}/>
          <Route path='/checkout/fail' element={<CheckoutFailure/>}/>
          <Route path="/course/displaylecture" element={<DisplayLectures/>}/>
        </Route> */}

        <Route path='/user/profile' element={<Profile/>}/>
        <Route path='/user/edit-profile' element={<EditProfile/>}/>
        <Route path='/checkout' element={<Checkout/>}/>
        <Route path='/checkout/success' element={<CheckoutSuccess/>}/>
        <Route path='/checkout/failure' element={<CheckoutFailure/>}/>
        <Route path="/course/displaylectures" element={<DisplayLectures/>}/>
        <Route path='/course/addlecture' element={<AddLecture/>}/>

      </Routes>

      
    </>
  )
}

export default App
