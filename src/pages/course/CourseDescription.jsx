
import { useLocation, useNavigate } from "react-router-dom";
import HomeLayout from "../../layouts/HomeLayout";
import { useSelector } from "react-redux";
import Button from "../../components/atomic/Button";
function CourseDescription(){
    const {state} = useLocation();
    const navigate = useNavigate();

    const {role, data} = useSelector((state) => state?.auth);

    return(
        <HomeLayout>
            <div className="min-h-[90vh] pt-12 px-20 flex flex-col items-start justify-center">
                <div className="grid grid-cols-2 gap-10 relative">
                    <div className="space-y-5">
                        <img 
                            src={state?.thumbnail?.secure_url} 
                            alt="course" 
                            className="w-full h-64"/>
                    </div>

                    <div className="space-y-5">
                        <div className="flex flex-col items-center justify-between text-xl">
                            <p className="font-semibold">
                                <span className="text-yellow-600 font-bold font-nunito">
                                    Total lectures:{" "}
                                </span>
                                {
                                    state?.numerOfLectures
                                }
                            </p>
                            <p className="font-semibold">
                                <span className="text-yellow-600 font-bold font-nunito">
                                    Instructor:{" "}
                                </span>
                                {
                                    state?.createdBy
                                }
                            </p>
                        </div>

                        {
                            role === "ADMIN" || data?.subscription?.status === "active" ?
                                <Button
                                    type="button"
                                    text="Watch lectures"
                                    className={"bg-yellow-500 text-xl text-white rounded-md font-bold px-5 py-2 w-full hover:bg-yellow-700 transition-all ease-in-out duration-300"}
                                    onClick={() => navigate(`/course/displaylectures`, {state:{...state}})}
                                />
                                :
                                <Button
                                    type="button"
                                    text="Subscribe"
                                    onClick={() => navigate("/subscribe")}
                                    className="bg-yellow-600 text-xl text-white rounded-md font-bold px-5 py-2 w-full hover:bg-yellow-700 transition-all ease-in-out duration-300"
                                    />
                                    
                                
                        }
                    </div>

                    <div className="space-y-2 text-xl font-roboto">
                        <h1 className="text-3xl font-semibold text-yellow-600 mb-5 text-center">
                            {state?.title}
                        </h1>

                        <p className="text-yellow-500">
                            Course description
                        </p>
                        <p className="text-gray-200 font-poppins text-md">
                            {state?.description}
                        </p>
                    </div>

                </div>
            </div>
        </HomeLayout>
    )
};

export default CourseDescription;