import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { getUserData, updateProfile } from "../../Redux/Slices/AuthSlice";
import { useNavigate, Link } from "react-router-dom";
import HomeLayout from "../../layouts/HomeLayout";
import { BsPersonCircle } from "react-icons/bs";
import Input from "../../components/atomic/Input";
import Button from "../../components/atomic/Button";
import { AiOutlineArrowLeft } from "react-icons/ai";



function EditProfile(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [data, setData] = useState({
        "previewImage":"",
        fullName:"",
        avatar:undefined,
        userId: useSelector((state) => state?.auth?.data?.userId)
    })

    function handleImageUpload(e){
        e.preventDefault();

        const upload_image = e.target.files[0];

        if(upload_image){
            const fileReader = new FileReader();
            fileReader.readAsDataURL(upload_image);
            fileReader.addEventListener('load', function(){
                setData({
                    ...data,
                    previewImage: this.result,
                    avatar: upload_image
                })
            })
        }
    }

    function handleInputChange(e){
        const {name, value} = e.target;
        setData({
            ...data,
            [name]: value
        })
    }

   async function handleSubmit(e){
        e.preventDefault();
        if(!data.fullName || !data.avatar || !data.userId){
            toast.error("All fields are required");
            return;
        }
        if(data.fullName.length < 5){
            toast.error("Name must be at least 5 characters");
            return;
        }

        const formData = new FormData();
        formData.append("fullName", data.fullName);
        formData.append("avatar", data.avatar);
        formData.append("userId", data.userId);

        try {
            await dispatch(updateProfile([data.userId, formData]));
            
            await dispatch(getUserData());

            navigate('/user/profile');

        }
        catch (error) {
            toast.error(error?.response?.data?.message);
        }
    }

    const inputClass = "w-full bg-transparent text-md font-poppins font-medium text-white placeholder-zinc-500 cursor-text outline-none border border-gray-400 rounded-md py-3 px-3 hover:border-white focus:border-none  focus:outline focus:outline-white "


    return( 
        <HomeLayout>
            <div className="w-full min-h-[90vh] flex items-center justify-center">
                <div className="w-1/3 h-full flex items-center justify-center bg-[#444444] rounded-lg">
                    <form onSubmit={handleSubmit}
                        className="w-full flex flex-col gap-4 justify-center rounded-lg p-6 text-white"
                    >
                        <h1 className="text-center text-2xl font-semibold font-poppins">
                            Edit Profile
                        </h1>
                        <label 
                            htmlFor="image_uploads"
                            className="w-32 h-32 rounded-full m-auto cursor-pointer">
                            {
                                data?.previewImage ? (
                                    <img 
                                     className="w-full h-full rounded-full m-auto"
                                     src={data?.previewImage} 
                                     alt="avatar"
                                    />
                                ):
                                    
                                (
                                    <BsPersonCircle className="w-full h-full rounded-full m-auto" />
                                )
                            }
                        </label>
                        
                        <Input
                            type="file"
                            id="image_uploads"
                            name="image_uploads"
                            accept=".jpg, .png, .jpeg"
                            onChange={handleImageUpload}
                            className="hidden"
                        />
                        <div className="flex flex-col gap-2">
                            <label htmlFor="fullName" className="text-lg font-semibold font-nunito">
                                Full Name
                            </label>
                            <Input
                                required
                                type="text"
                                name="fullName"
                                id="fullName"
                                placeholder="Enter your full name"
                                value={data.fullName}
                                onChange={handleInputChange}
                                className={inputClass}
                            />
                        </div>

                        <Button 
                            className={"w-full bg-yellow-500 px-8 py-2 font-nunito text-white font-semibold rounded-md hover:bg-yellow-600"}
                            text="Update Profile"
                            type="submit"
                        />
                        
                        <Link to="/user/profile">
                            <p className="w-full link text-accent cursor-pointer flex items-center justify-center gap-1"> 
                                
                                <AiOutlineArrowLeft />   Go Back to profile</p>
                        </Link>

                    </form>
                </div>

            </div>
        </HomeLayout>
    )

}

export default EditProfile;