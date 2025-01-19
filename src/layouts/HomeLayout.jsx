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


    function toggleDrawer() {
        setIsDrawerOpen(!isDrawerOpen);
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
                        className="size-6 font-bold text-white m-4"
                        aria-label="Open menu"
                    />
                </div>
                <div
                    className={`drawer-side  transition-all duration-300 ${
                        isDrawerOpen ? "w-80" : "w-0"
                    }`}
                >
                    <label
                        htmlFor="my-drawer"
                        className="drawer-overlay"
                        onClick={toggleDrawer}
                    ></label>
                    <ul className="w-full menu  bg-base-100 text-base-content">
                        <li className="absolute right-2 z-50">
                            <button onClick={toggleDrawer}>
                                <AiFillCloseCircle
                                    className="size-6"
                                    aria-label="Close menu"
                                />
                            </button>
                        </li>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        {
                            isLoggedIn && role === "ADMIN" && (
                                <li>
                                    <Link to="/admin/dashboard">Admin Dashboard</Link>
                                </li>
                            )
                        }
                        <li>
                            <Link to="/">All courses</Link>
                        </li>
                        <li>
                            <Link to="/">Contact Us</Link>
                        </li>
                        <li>
                            <Link to="/">About Us</Link>
                        </li>
                        {
                            !isLoggedIn && (
                                <div className="w-full flex flex-col items-center justify-center gap-3">
                                    <Link to="/login">
                                        <Button
                                        text="Log in"
                                        className="btn btn-accent font-semibold"
                                        />
                                    </Link> 
                                    <Link to="/signin">
                                        <Button
                                        text="Sign in"
                                        className="btn btn-primary font-semibold"
                                        />
                                    </Link>  
                                </div>
                            )
                        }
                    </ul>
                </div>
            </div>
            {children}
            <Footer />
        </div>
    );
}



export default HomeLayout;