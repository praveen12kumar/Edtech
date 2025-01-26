import HomeLayout from "../../layouts/HomeLayout";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/atomic/Button";


function Profile(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const {userData} = useSelector((state) => state?.auth?.data);

    const userData = {
        fullName: "John Doe",
        email: "bR5oT@example.com",
        role: "Admin",
        avatar: {
            secure_url: "https://robohash.org/sanket"
        },
        subscription: {
            status: "active"
        }
    }

   
    return(
        <HomeLayout>
            <div className="w-full min-h-[90vh] flex items-center justify-center">
                <div className="my-10 bg-[#444444] flex flex-col gap-4 rounded-lg p-8 text-white w-96 shadow-lg">
                    <img 
                        className="w-40 h-40 rounded-full mx-auto border border-gray-500 p-1"
                        src={userData?.avatar?.secure_url} 
                        alt="avatar" 
                    />
                    <h3 className="text-2xl font-semibold text-center capitalize font-poppins">
                        {userData?.fullName}
                    </h3>

                    <div className="grid grid-cols-2 gap-4 font-nunito">
                        <p className="font-nunito">Email: </p>
                        <p className="font-semibold">{userData?.email}</p>
                        
                        <p className="font-nunito">Role: </p>
                        <p>{userData?.role}</p>
                        
                        <p className="font-nunito">Subscription: </p>
                        <p>{userData?.subscription?.status ? "Active" : "Inactive"}</p>
                    </div>
                    <div className="flex items-center justify-center gap-3">
                        
                        <Button 
                            type="button"
                            text="Change Password"
                            className="btn btn-accent text-white text-lg transition-all ease-in-out duration-300 rounded-md font-semibold font-nunito"
                            onClick={() => navigate("/user/changePassword")}
                        />
                            
                            <Button 
                            type="button"
                            text="Edit Profile"
                            className="btn btn-secondary text-white text-lg transition-all ease-in-out duration-300 rounded-md font-semibold font-nunito"
                            onClick={() => navigate("/user/editProfile")}
                        />
                    </div>

                    {
                        userData?.subscription?.status === "active" && (
                            <Button 
                                type="button"
                                text="Cancel Subscription"
                                className="btn btn-error text-white text-lg transition-all ease-in-out duration-300 rounded-md font-semibold font-nunito"
                                onClick={() => navigate("/user/cancelSubscription")}
                            />
                        )
                    }
                </div>

            </div>
        
        </HomeLayout>
    )
};

export default Profile;