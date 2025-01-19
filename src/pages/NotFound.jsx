import LottiImage from "../components/atomic/LottiImage";
import notFound from "../assets/notFound.json";
import Button from "../components/atomic/Button";
import { useNavigate } from "react-router-dom";

function NotFound(){

    const navigate = useNavigate();

    function handleGoBack(){
        navigate(-1)
    }

    return(
        <div className="w-full h-dvh flex flex-col items-center justify-center bg-[#121212]">

                <div className="w-[300px] h-[300px] ">
                <LottiImage Animation={notFound} height={400} width={300} />
                </div>
                <div className="">
                    Page not Found...
                </div>
                <Button
                    text="Go Back"
                    className="btn btn-accent btn-wide mt-5 text-white text-lg"
                    onClick={handleGoBack}
                />
        </div>
    )
}


export default NotFound;