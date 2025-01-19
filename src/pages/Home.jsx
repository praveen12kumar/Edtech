import HomeLayout from "../layouts/HomeLayout";
import Button from "../components/atomic/Button";
import { Link } from "react-router-dom";
import LottiImage from "../components/atomic/LottiImage";
import home from "../assets/home.json";


function Home (){

    return(
        <HomeLayout>
            <div className="pt-10 mx-16 h-[90vh] text-white flex items-center justify-center gap-10">
                <div className="w-1/2 space-y-6 ">
                    
                    <h1 className="text-5xl font-semibold">
                        Find out best
                        <span className="text-sky-700 font-bold">Online Courses</span>
                    </h1>
                    <p className="text-xl text-gray-300">
                        We have a large library of courses tought by highly skilled  and qualified faculties at a very affordable cost.
                    </p>

                    <div className="space-x-6">
                        <Link to='/courses'>
                            <Button 
                                text="Explore Courses"
                                className="bg-yellow-500 px-5 py-3 rounded-md font-semibold text-lg hover:bg-yellow-600 transition-all ease-in-out duration-300"
                                />
                        </Link>

                        <Link to='/contact'>
                            <Button 
                                text="Contact Us"
                                className=" px-5 py-3 rounded-md border border-yellow-500 font-semibold text-lg hover:bg-yellow-600 transition-all ease-in-out duration-300"
                                />
                        </Link>
                    </div> 
                </div>
                <div className="w-1/3 flex items-center justify-center ">
                        <LottiImage Animation={home}/>
                    </div>
            </div>
        </HomeLayout>
    )
};

export default Home