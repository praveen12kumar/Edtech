import HomeLayout from "../layouts/HomeLayout";
import Button from "../components/atomic/Button";
import { useNavigate } from "react-router-dom";
import LottiImage from "../components/atomic/LottiImage";
import home from "../assets/home.json";

function Home() {
    const navigate = useNavigate();

    const primaryButtonStyles = "bg-yellow-500 px-5 py-3 font-nunito rounded-md font-semibold text-lg hover:bg-yellow-600 transition-all ease-in-out duration-300 cursor-pointer";
    const secondaryButtonStyles = "px-5 py-3 rounded-md border font-nunito border-yellow-500 font-semibold text-lg hover:bg-yellow-600 cursor-pointer transition-all ease-in-out duration-300";

    return (
        <HomeLayout>
            <div className="pt-10 mx-16 h-[90vh] text-white flex items-center justify-center gap-10">
                <div className="w-1/2 space-y-6">
                    <h1 className="text-5xl font-semibold font-poppins">
                        Find out the best
                        <span className="text-sky-700 font-bold font-nunito"> Online Courses</span>
                    </h1>
                    <p className="text-xl text-gray-300 font-roboto">
                        We have a large library of courses taught by highly skilled and qualified faculties at a very affordable cost.
                    </p>
                    <div className="space-x-6">
                        <Button
                            text="Explore Courses"
                            className={primaryButtonStyles}
                            onClick={() => {
                                console.log("btn clicked")
                                navigate("/courses")
                            }}
                        />
                        <Button
                            text="Contact Us"
                            className={secondaryButtonStyles}
                            onClick={() => navigate("/contact")}
                        />
                    </div>
                </div>
                <div className="w-1/3 flex items-center justify-center">
                    <LottiImage Animation={home} />
                </div>
            </div>
        </HomeLayout>
    );
}

export default Home;
