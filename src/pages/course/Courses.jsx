import { useDispatch } from "react-redux";
import { getAllCourses } from "../../Redux/Slices/CourseSlice";
import { useEffect } from "react";
import HomeLayout from "../../layouts/HomeLayout";
import CourseCard from "../../components/molecules/CourseCard";


function Course(){
    const dispatch = useDispatch();

    const {courseData} = useDispatch((state)=> state.course);

    async function loadCourses() {
        await dispatch(getAllCourses());
    }

    useEffect(()=>{
        loadCourses();
    },[]);


    return (
        <HomeLayout>
            <div className="min-h-[90vh] pt-12 px-20 flex flex-col gap-10 text-white">
                <h1 className="text-3xl text-center font-semibold mb-5">
                    Explore the Course made by
                    <span className="font-bold text-yellow-600">
                        Industry experts
                    </span>
                </h1>
                    <div className="mb-10 flex flex-wrap gap-10">
                        {
                            courseData?.map((course)=>(
                                <CourseCard data={course} key={course._id} />
                            ))
                        }
                    </div>
                

            </div>
        </HomeLayout>
    )
};

export default Course;