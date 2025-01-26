import { useNavigate } from "react-router-dom";

function CourseCard({data}){

    const navigate = useNavigate();

    return(
        <div className="text-white bg-zinc-800 w-40 h-72 shadow-lg rounded-lg cursor-pointer group overflow-hidden"
            onClick={() => navigate(`/course/description`, {state:{...data}})}
        >
            <div className="overflow-hidden">
                <img 
                    src={data?.thubnail?.secure_url} 
                    alt="course" 
                    className="h-48 w-full rounded-tl-lg group-hover:scale=[1.2] transition-all ease-in-out duration-300" 
                />
                <div className="p-3 space-y-1 text-white">
                    <h2 className="text-lg font-semibold text-yellow-600 line-clamp-2">
                        {data?.title}
                    </h2>
                    <p className="line-clamp-2 text-sm text-gray-700">
                        {data?.description}
                    </p>
                    <p className="font-semibold">
                        <span className="text-yellow-600">Category: </span>
                        {data?.category}
                    </p>
                    <p className="text-yellow-600 font-bold">
                        <span className="text-yellow-600">Total lectures: </span>${data?.numerOfLectures}
                    </p>

                    <p className="text-yellow-600 font-semibold">
                        <span className="text-yellow-600">Instructors: </span>${data?.createdBy}
                    </p>
                </div>
            </div>
        </div>
    )
};

export default CourseCard;