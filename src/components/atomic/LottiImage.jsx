

import Lottie from "react-lottie";
import Animation from "../../assets/Animation.json";



function LottiImage(){

    const defaultOptions = {
        loop: true,
        autoplay: true, 
        animationData: Animation,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
    }


    return(
       <Lottie options={defaultOptions}
        height={400}
        width={400}
       />
    )
}

export default LottiImage;