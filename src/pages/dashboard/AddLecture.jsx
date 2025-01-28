import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HomeLayout from "../../layouts/HomeLayout";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { addCourseLecture } from "../../Redux/Slices/LectureSlice";
import Button from "../../components/atomic/Button";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Input from "../../components/atomic/Input";


function AddLecture(){

    const courseDetails = useLocation().state;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [userInput, setUserInput] = useState({
        id:courseDetails?._id,
        lecture:undefined,
        title:"",
        description:"",
        videoSrc:"",
    })

    function handleInputChange(e){
        const {name, value} = e.target;
        setUserInput({
            ...userInput,
            [name]: value
        })
    };

    function handleVideoUpload(e){
        const upload_video = e.target.files[0];
        const source = window.URL.createObjectURL(upload_video);
        setUserInput({
            ...userInput,
            lecture: upload_video,
            videoSrc: source
        })
    }

    async function onFormSubmit(e){
        e.preventDefault();
        if(!userInput.title || !userInput.description || !userInput.videoSrc || !userInput.lecture){
            toast.error("All fields are required");
            return;
        }

        const response =  await dispatch(addCourseLecture(userInput));
        if(response?.payload?.success){
            setUserInput({
                id:courseDetails?._id,
                lecture:undefined,
                title:"",
                description:"",
                videoSrc:""
            })
        }

    }

    useEffect(()=>{
        if(!courseDetails){
            navigate("/courses");
        }
    },[])

    const inputClass = "w-full bg-transparent text-md font-poppins font-medium text-white placeholder-zinc-500 cursor-text outline-none border border-gray-400 rounded-md py-3 px-3 hover:border-white focus:border-none  focus:outline focus:outline-white "


    return(
        <HomeLayout>
            <div className="min-h-[90vh] text-white flex flex-col items-center justify-center gap-5 mx-16 my-20">
                <div className="w-1/3 rounded-lg flex flex-col gap-5 p-2 shadow-xl">
                    <header className="flex items-center justify-between">
                        <Button
                            type={"button"}
                            text={<AiOutlineArrowLeft />}
                            onClick={() => navigate(-1)}
                            className={"absolute left-2 text-xl text-green-600"}
                        />
                        <h1 className="text-2xl font-semibold">
                            Add new lecture
                        </h1>
                    </header>

                    <form onSubmit={onFormSubmit}
                        className="flex flex-col gap-3"
                    >
                        <Input 
                            type={"text"}
                            name="title"
                            placeholder={"Enter lecture title of the lecture"}
                            onChange={handleInputChange}
                            value={userInput.title}
                            className={inputClass}
                        />
                        <textarea
                            type={"text"}
                            name="description"
                            placeholder={"Enter description of the lecture"}
                            onChange={handleInputChange}
                            value={userInput.description}
                            className={"bg-transparent px-3 py-1 border resize-none overflow-y-scroll outline-none border-gray-400 rounded-md "}
                        />

                        {
                            userInput.videoSrc ?
                            <video 
                                src={userInput.videoSrc} 
                                controls
                                muted
                                controlsList="nodownload nofullscreen noremoteplayback"
                                disablePictureInPicture
                                className="object-fill rounded-tl-lg rounded-tr-lg w-full"
                                ></video> : 
                                (
                                    <div className="h-48 border border-gray-400 rounded-lg flex flex-col items-center justify-center object-cover">
                                        <label htmlFor="lecture"
                                            className="text-sm text-gray-400 cursor-pointer"
                                            
                                        >Choose your video</label>
                                        <Input
                                            type={"file"}
                                            className={"hidden"}
                                            id="lecture"
                                            name={"lecture"}
                                            onChange={handleVideoUpload}
                                            accept={"video/mp4 video/x-mp4 video/*"}

                                        />
                                    </div>
                                )
                        }

                        <Button
                            type={"submit"}
                            text={"Add Lecture"}
                            className={"btn btn-green btn-wide"}
                        />
                      
                    </form>


                </div>
            </div>

        </HomeLayout>
    )
};

export default AddLecture;