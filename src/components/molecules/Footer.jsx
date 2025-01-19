import {BsFacebook, BsInstagram, BsLinkedin, BsTwitterX} from "react-icons/bs";

function Footer() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
  return (
    <footer className="h-[10vh] py-5  px-3 sm:px-20 relative left-0 bottom-0 flex flex-col sm:flex-row items-center justify-between text-white bg-gray-800 ">
        <div className="text-lg">
            Copyright {year} | All rights reserved
        </div>
        <div className="flex items-center justify-center gap-5 text-2xl text-white">
            <a className="hover:text-sky-600 transition-all ease-in-out duration-200"><BsFacebook/></a>
            <a className="hover:text-sky-600 transition-all ease-in-out duration-200"><BsInstagram/></a>
            <a className="hover:text-sky-600 transition-all ease-in-out duration-200"><BsLinkedin/></a>
            <a className="hover:text-sky-600 transition-all ease-in-out duration-200"><BsTwitterX/></a>
        </div>

    </footer>
  )
}

export default Footer