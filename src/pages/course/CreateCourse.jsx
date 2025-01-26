import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { createNewCourse } from "../../Redux/Slices/CourseSlice";
import HomeLayout from "../../layouts/HomeLayout";
import { AiOutlineArrowLeft } from "react-icons/ai";

function CreateCourse(){
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [userInput, setUserInput] = useState({
        title:"",
        category:"",
        createdBy:"",
        description:"",
        thumbnail:"",
        previewImage:"",
    })

    function handleImageUpload(e){
        e.preventDefault();

        const uploadImage = e.target.files[0];

        if(uploadImage){
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadImage);
            fileReader.addEventListener('load', function(){
                setUserInput({
                    ...userInput,
                    previewImage: this.result,
                    thumbnail:uploadImage
                })
            })
        }
    }

    function handleUserInput(e){
        const {name, value} = e.target;
        setUserInput({
            ...userInput,
            [name]: value
        })
    }

    async function onFormSubmit(e){
        e.preventDefault();

        if(!userInput.title || !userInput.category || !userInput.createdBy || !userInput.description || !userInput.thumbnail){
            toast.error("All fields are required");
            return;
        }

        const response = await dispatch(createNewCourse(userInput));
        if(response?.payload?.success){
            setUserInput({
                title:"",
                category:"",
                createdBy:"",
                description:"",
                thumbnail:"",
                previewImage:""
            })
        }
        navigate("/courses")
    }


    return(
        <HomeLayout>
           <div className="w-full h-dvh flex flex-col items-center justify-center">
                <form 
                    className="w-1/3 flex flex-col justify-center gap-5 rounded-lg p-4 text-white my-10 shadow-lg relative"
                    onSubmit={onFormSubmit}
                    >   
                        <Link className="absolute top-8 text-2xl  text-accent cursor-pointer">
                            <AiOutlineArrowLeft/>
                        </Link>
                        <h1 className="text-3xl font-semibold text-center font-poppins">Create New Course</h1>

                        <main className="grid grid-cols-2 gap-x-10">
                            <div className="gap-y-6">
                                <div className="">
                                    <label htmlFor="image_uploads" className="cursor-pointer">
                                        {
                                            userInput.previewImage ? 
                                            <img 
                                                src={userInput.previewImage}
                                                alt="course"
                                                className="w-full h-44 m-auto object-cover rounded-md"
                                            />:
                                            (
                                                <div className="w-full h-44 m-auto flex items-center justify-center border-1 border-gray-400 rounded-md">
                                                    <h1 className="font-bold text-md">Upload your course thumbnail</h1>
                                                </div>
                                            )
                                        }
                                        <input 
                                            type="file"
                                            id="image_uploads"
                                            name="image_uploads"
                                            accept=".jpg .png .jpeg"
                                            onChange={handleImageUpload}
                                            className="hidden"
                                        />
                                    </label>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="title" className="text-lg font-semibold">
                                        Course title
                                        <input 
                                            type="text" 
                                            className="bg-transparent px-2 py-1 border" 
                                            name="title"
                                            id="title"
                                            placeholder="Enter course title"
                                            value={userInput?.title}
                                            onChange={handleUserInput}
                                            />
                                    </label>
                                </div>      
                            </div>

                            <div className="">
                            <div className="flex flex-col gap-1">
                                    <label htmlFor="createdBy" className="text-lg font-semibold">
                                        Course Instructor
                                        <input 
                                            type="text" 
                                            className="bg-transparent px-2 py-1 border" 
                                            name="createdBy"
                                            id="createdBy"
                                            placeholder="Enter course instructor"
                                            value={userInput?.createdBy}
                                            onChange={handleUserInput}
                                            />
                                    </label>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="category" className="text-lg font-semibold">
                                        Course Category
                                        <input 
                                            type="text" 
                                            className="bg-transparent px-2 py-1 border" 
                                            name="category"
                                            id="category"
                                            value={userInput?.category}
                                            onChange={handleUserInput}
                                            />
                                    </label>
                                </div> 

                                <div className="flex flex-col gap-1">
                                    <label htmlFor="description" className="text-lg font-semibold">
                                        Course Description
                                        <textarea 
                                            type="text"
                                            className="bg-transparent px-2 py-1 border resize-none overflow-y-scroll" 
                                            name="description"
                                            id="description"
                                            placeholder="Enter course description"
                                            value={userInput?.description}
                                            onChange={handleUserInput}
                                            />
                                    </label>
                                </div>    
                            </div>
                        </main>
                        
                        <button 
                            type="submit"
                            className="px-8 py-3 bg-[#1A2238] border border-gray-500 font-nunito text-white rounded-lg hover:bg-[#101522]"
                            >
                            Create Course
                        </button>
                </form>
           </div>
        </HomeLayout>
    )
};

export default CreateCourse;