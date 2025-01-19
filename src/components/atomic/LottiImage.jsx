
import Lottie from "lottie-react";

function LottiImage({Animation, height=400, width=400}){

    


    return(
       <Lottie animationData={Animation}
        height={height}
        width={width}
       />
    )
}

export default LottiImage;