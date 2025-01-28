import { useDispatch, useSelector } from "react-redux";
import HomeLayout from "../../layouts/HomeLayout";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from "chart.js";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { deleteCourse, getAllCourses } from "../../Redux/Slices/CourseSlice";
import { getStatsData } from "../../Redux/Slices/StatSlice";
import { getPaymentRecord } from "../../Redux/Slices/RazorpaySlice";
import { Bar, Pie } from "react-chartjs-2";
import { FaUsers } from "react-icons/fa";
import { FcSalesPerformance } from "react-icons/fc";
import { GiMoneyStack } from "react-icons/gi";
import Button from "../../components/atomic/Button";
import { BsCollectionPlayFill, BsTrash } from "react-icons/bs";


ChartJS.register(ArcElement, BarElement, CategoryScale, Legend, LinearScale, Title, Tooltip)
    

function AdminDashboard() {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {allUsersCount, subscribedCount} = useSelector((state) => state.stats);
    const {allPayments, monthlySalesRecord} = useSelector((state) => state?.razorpay);

    const userData = {
        labels: ["Registered Users", "Enrolled Users"],
        datasets:[
            {
                label: "User Details",
                data: [allUsersCount, subscribedCount],
                backgroundColor: ["#FF0000","#0000FF"],
                borderColor: ["#FF0000","#0000FF"],
                borderWidth: 1
            }
        ]
    }

    const salesData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets:[
            {
                label:"Sales / Month",
                data: monthlySalesRecord,
                backgroundColor: "#0000FF",
                borderColor: "#0000FF",
                borderWidth: 2
            }
        ],
        fontColors:"white"
    }

    const myCourses = useSelector((state) => state?.course?.courseData);

    async function onCourseDelete(id) {
        if(window.confirm("Are you sure you want to delete this course?")) {
            const res = await dispatch(deleteCourse(id));
            if(res?.payload?.success) {
                await dispatch(getAllCourses());
            }
        }
    }


    useEffect(()=>{
        (
            async ()=>{
                await dispatch(getAllCourses());
                await dispatch(getStatsData());
                await dispatch(getPaymentRecord())
            }
        )
    },[])
    
    return (
        <HomeLayout>
            <div className="min-h-[90vh] pt-5 flex flex-col flex-wrap gap-10 text-white">
                <h1 className="text-3xl text-center font-semibold font-nunito text-sky-700">Admin Dashboard</h1>
                <div className="grid grid-cols-2 gap-5 m-auto mx-10">
                    <div className="flex flex-col items-center gap-10 p-5 shadow-lg rounded-md">
                        <div className="w-80 h-80">
                            <Pie data={userData} />
                        </div>

                        <div className="grid grid-cols-2 gap-5">
                            <div className="flex  items-center justify-between p-5 shadow-md rounded-md">
                                <div className="flex flex-col items-center">
                                    <p className="font-semibold font-nunito">Registered Users</p>
                                    <h3 className="text-3xl font-semibold">{allUsersCount}</h3>
                                </div>
                                <FaUsers className="text-sky-700 text-3xl" />
                            </div>
                            <div className="flex  items-center justify-between p-5 shadow-md rounded-md">
                                <div className="flex flex-col items-center">
                                    <p className="font-semibold font-nunito">Subscribed Users</p>
                                    <h3 className="text-3xl font-semibold">{subscribedCount}</h3>
                                </div>
                                <FaUsers className="text-sky-700 text-3xl" />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-center gap-10 p-5 shadow-lg rounded-md">
                        <div className="h-80 w-full relative">
                            <Bar data={salesData}
                                className="absolute bottom-0 h-80 w-full"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-5">
                            <div className="flex  items-center justify-between p-5 shadow-md rounded-md">
                            <div className="flex flex-col items-center">
                                    <p className="font-semibold font-nunito">Subscribed Count</p>
                                    <h3 className="text-3xl font-semibold">{allPayments?.Count}</h3>
                                </div>
                                <FcSalesPerformance className="size-8" />
                            </div>

                            <div className="flex  items-center justify-between p-5 shadow-md rounded-md">
                            <div className="flex flex-col items-center">
                                    <p className="font-semibold font-nunito">Total Revenue</p>
                                    <h3 className="text-3xl font-semibold">{allPayments?.Count * 499}</h3>
                                </div>
                                <GiMoneyStack className="size-8" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mx-[10%] w-[80%] self-center flex flex-col items-center justify-center gap-10 mb-10">
                    <div className="flex w-full items-center justify-between">
                        <h1 className="text-center text-2xl font-semibold font-roboto">Courses Overview</h1>
                        <Button
                            text={"Create new course"}
                            className={"w-fit bg-sky-800 hover:bg-sky-700 transition-all ease-in-out duration-300 rounded-md text-white cursor-pointer"}
                            onClick={()=> navigate('/course/create')}
                        />
                    </div>

                    <table className="table overflow-x-scroll">
                        <thead>
                            <tr>
                                <th>S No</th>
                                <th>Course Title</th>
                                <th>Instructor</th>
                                <th>Total Lecture</th>
                                <th>Description</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                myCourses?.map((course, idx)=>{
                                    return(
                                        <tr key={course._id}>
                                            <td>{idx + 1}</td>
                                            <td>
                                                <textarea readOnly value={course?.title}
                                                 className="w-40 h-auto bg-transparent resize-none"
                                                />
                                            </td>
                                            <td>{course?.category}</td>
                                            <td>{course?.createdBy}</td>
                                            <td>{course?.numberOfLectures}</td>  
                                            <td className="max-w-28 overflow-hidden text-ellipsis whitespace-nowrap">
                                                <textarea
                                                    value={course?.description}
                                                    readOnly
                                                    className="w-80 read-only h-auto bg-transparent resize-none"
                                                >
                                                </textarea>
                                            </td> 
                                            <td className="flex items-center gap-4">
                                                <Button
                                                    className={"bg-green-700 hover:bg-green-600 transition-all ease-in-out duration-300 px-4 py-2 rounded-md font-nunito font-bold"}
                                                    onClick={()=> navigate('/course/displaylectures', {state:{...course}})}
                                                    text={<BsCollectionPlayFill/>}
                                                />

<Button
                                                    className={"bg-red-700 hover:bg-red-600 transition-all ease-in-out duration-300 px-4 py-2 rounded-md font-nunito font-bold"}
                                                    onClick={()=> onCourseDelete(course?._id) }
                                                    text={<BsTrash/>}
                                                />
                                            </td> 
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>

            </div>
        
        </HomeLayout>
    )
}

export default AdminDashboard;