import { useState } from "react";
import HomeLayout from "../layouts/HomeLayout";
import contact from "../assets/contact.json";
import LottiImage from "../components/atomic/LottiImage";
import Input from "../components/atomic/Input";
import Button from "../components/atomic/Button";
import { validateEmail } from "../helpers";
import toast from "react-hot-toast";
import axiosInstance from "../helpers/axiosInstance";

function ContactUs(){

    const [formValues, setFormValues] = useState({
        name: "",
        email:"",
        message:""
    })

    const inputClass = "w-full bg-transparent text-md font-poppins font-medium text-white placeholder-zinc-500 cursor-text outline-none border border-gray-400 rounded-md py-3 px-3 hover:border-white focus:border-none  focus:outline focus:outline-white "

    function handleChangeInput(e){
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        })
    }

    async function onSubmit(e){
        e.preventDefault();

        if(!formValues.name || !formValues.email || !formValues.message){
            toast.error("All fields are required")
        }else if(!validateEmail(formValues.email)){
            toast.error("Please enter a valid email address")
        }else{
            toast.success("Message sent successfully")
            setFormValues({
                name: "",
                email:"",
                message:""
            })
        }

        try {
            const response = axiosInstance.post("/contact", formValues);
            toast.promise(response, {
                loading: "Sending message...",
                success: "Message sent successfully",
                error: "Failed to send message"
            })

            const contactResponse = await response;
            if(contactResponse?.data?.success){
                setFormValues({
                    name: "",
                    email:"",
                    message:""
                })
            }
        } catch (error) {
            toast.error("Failed to send message...")
        }
    }


    return(
        <HomeLayout>
            <div className="w-full min-h-[90vh] flex items-center justify-evenly gap-6">
                <div className="w-1/3 h-full flex flex-col items-center font-poppins p-6 bg-slate-800 rounded-lg shadow-lg ">
                    <h1 className="w-full text-clip text-center p-2 rounded-md text-white text-5xl font-semibold custom-gradient-green">Contact Us</h1>
                    <form noValidate 
                        onSubmit={onSubmit} className="w-3/4 flex flex-col gap-6 mt-6">

                    <div className="w-full  flex  flex-col gap-1">
                        <label className="text-white" htmlFor="name">name</label>
                        <Input 
                            type="text" 
                            name="name" 
                            id="name" 
                            placeholder="Enter your name" 
                            value={formValues.name}
                            className= {inputClass}
                            onChange={handleChangeInput}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-white" htmlFor="email">Email</label>
                        <Input 
                            type="email" 
                            name="email" 
                            id="email" 
                            placeholder="Enter your email" 
                            value={formValues.email}
                            className= {inputClass}
                            onChange={handleChangeInput}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-white" htmlFor="message">Message</label>
                        <textarea
                            name="message" 
                            id="message" 
                            placeholder="Enter your message" 
                            className= {`${inputClass} h-40 resize-none px-2 py-1`}
                            onChange={handleChangeInput}
                        />
                    </div>

                    <Button
                        type="submit"
                        text="Create account"
                        className={"bg-yellow-600 text-white px-5 py-3 mb-5 font-nunito rounded-md font-bold text-lg hover:bg-yellow-700 transition-all ease-in-out duration-300 cursor-pointer"}
                    />

                    </form>
                </div>
                <div className="w-1/3 h-full flex items-center justify-center">
                    <LottiImage Animation={contact} height={400} width={300} />
                </div>
            </div>

        </HomeLayout>
    )
};

export default ContactUs;