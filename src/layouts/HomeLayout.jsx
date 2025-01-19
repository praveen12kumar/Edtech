import { useState } from "react";
import { Link } from "react-router-dom";
import {FiMenu} from "react-icons/fi";
import { AiFillCloseCircle } from "react-icons/ai";
import Footer from "../components/molecules/Footer";

function HomeLayout({ children }) {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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
                        <li>
                            <Link to="/">All courses</Link>
                        </li>
                        <li>
                            <Link to="/">Contact Us</Link>
                        </li>
                        <li>
                            <Link to="/">About Us</Link>
                        </li>
                    </ul>
                </div>
            </div>
            {children}
            <Footer />
        </div>
    );
}



export default HomeLayout;