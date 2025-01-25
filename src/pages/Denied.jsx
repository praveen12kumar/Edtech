import { useNavigate } from "react-router-dom";

function Denied(){

    const navigate = useNavigate();

    return(
        <main className="w-full h-dvh flex flex-col items-center justify-center ">
            <h1 className="text-9xl font-extrabold text-white tracking-widest">403</h1>

            <div className="bg-black text-white px-2  text-sm rounded rotate-12 absolute">
                Access denied
            </div>

            <button className="mt-5" onClick={()=> navigate(-1)} >
               <span className="relative block px-8 py-3 bg-[#1A2238] border border-gray-500 font-nunito text-white rounded-lg hover:bg-[#101522]">Go back</span>
            </button>
        </main>
    )
};

export default Denied;