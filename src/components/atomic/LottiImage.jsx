

import Lottie from "lottie-react";
import Animation from "../../assets/Animation.json";



function LottiImage(){

    


    return(
       <Lottie animationData={Animation}
        height={400}
        width={400}
       />
    )
}

export default LottiImage;