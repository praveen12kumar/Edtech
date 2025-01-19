import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {FiMenu} from "react-icons/fi";
import { AiFillCloseCircle } from "react-icons/ai";
import Footer from "../components/molecules/Footer";
import { useDispatch, useSelector } from "react-redux";
import Button from "../components/atomic/Button";

function HomeLayout({ children }) {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {role, isLoggedIn} = useSelector((state) => state?.auth);

    console.log("isLoggedIn", isLoggedIn)

    function toggleDrawer() {
        setIsDrawerOpen(!isDrawerOpen);
    }

    function handleLogout(e){
        e.preventDefault();
        //const res = await dispatch(logout)
        // if(res?.payload?.success){
        //     navigate("/")
        // }
    }

    return (
        <div className="min-h-[90vh]">
            <div className="drawer absolute left-0 z-50">
                <input
                    id="my-drawer"
                    type="checkbox"
                    className="drawer-toggle"
                    checked={isDrawerOpen}
                    onChange={toggleDrawer}
                />
                <div className="drawer-content">
                    <FiMenu
                        onClick={toggleDrawer}
                        className={`size-6 cursor-pointer  font-bold text-white m-4 absolute left-0 `}
                        aria-label="Open menu"
                    />
                </div>
                <div className={`drawer-side  transition-all duration-300 relative ${
                        isDrawerOpen ? "w-80" : "w-0"
                    }`}
                >
                    <label
                        htmlFor="my-drawer"
                        className="drawer-overlay"
                        onClick={toggleDrawer}
                    ></label>
                    <ul className="w-full h-1/2 menu  bg-base-100 text-base-content">
                        <li className="absolute right-2 z-50">
                            <button onClick={toggleDrawer}
                                className="hover:text-white transition-colors duration-300 ease-in-out"
                                >
                                <AiFillCloseCircle
                                    className="size-6 "
                                    aria-label="Close menu"
                                />
                            </button>
                        </li>
                        <li className="hover:text-white">
                            <Link to="/">Home</Link>
                        </li>
                        {
                            isLoggedIn && role === "ADMIN" && (
                                <li className="hover:text-white">
                                    <Link to="/admin/dashboard">Admin Dashboard</Link>
                                </li>
                            )
                        }
                        <li className="hover:text-white">
                            <Link to="/">All courses</Link>
                        </li>
                        <li className="hover:text-white">
                            <Link to="/">Contact Us</Link>
                        </li>
                        <li className="hover:text-white">
                            <Link to="/about">About Us</Link>
                        </li>
                    </ul>
                    <>
                    { !isLoggedIn &&
                        <div className="w-1/2 absolute top-48 left-6 flex flex-col gap-6">
                        <Button 
                            text="Log in" 
                            className="btn bg-sky-800 hover:bg-sky-900 text-white text-lg"
                            onClick={()=> navigate('/login')}
                            />
                        <Button 
                            text="Sign in" 
                            className="btn bg-yellow-700 hover:bg-yellow-800 text-white text-lg" 
                            onClick={()=>navigate('/signin')}
                            /> 
                    </div>
                    }
                    </>

                    <>
                    { isLoggedIn &&
                        <div className="w-1/2 absolute top-48 left-6 flex flex-col gap-6">
                        <Button 
                            text="Profile" 
                            className="btn bg-sky-800 hover:bg-sky-900 text-white text-lg"
                            onClick={()=> navigate("/user/profile")}
                            />
                        <Button 
                            text="Logout" 
                            className="btn bg-yellow-700 hover:bg-yellow-800 text-white text-lg" 
                            onClick={handleLogout}
                            /> 
                    </div>
                    }
                    </>

                </div>
            </div>
            {children}
            <Footer />
        </div>
    );
}



export default HomeLayout;