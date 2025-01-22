import { useState } from "react";
import HomeLayout from "../layouts/HomeLayout";
import Input from "../components/atomic/Input";
import Button from "../components/atomic/Button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {validateEmail, validatePassword} from "../helpers/index";
import toast from "react-hot-toast";
import {login} from "../Redux/Slices/AuthSlice";


function Login(){

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formValues, setFormValues] = useState({
        email: "",
        password: "",
    });

    

    function handleInput(e){
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        })
    }

    async function loginAccount(e){
        e.preventDefault();
        if( !formValues.email || !formValues.password){
            toast.error("All fields are required");
            return;
        }
        if(!validateEmail(formValues.email)){
            toast.error("Please enter a valid email");
            return;
        }
        if(!validatePassword(formValues.password)){
            toast.error("Password should be 6-16 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.");
            return;
        }

        // dispatch the action
        const res = await dispatch(login(formValues));

        if(res?.payload?.success){
            navigate("/");
        }
        
        setFormValues({
            email: "",
            password: "",
        });
    }





    const inputClass = "w-full bg-transparent text-md font-poppins font-medium text-white placeholder-zinc-500 cursor-text outline-none border border-gray-400 rounded-md py-3 px-3 hover:border-white focus:border-none  focus:outline focus:outline-white "

    return(
        <HomeLayout>
            <div className="flex items-center justify-center h-[90vh] z-0">
                <form 
                    className="w-1/3 flex flex-col justify-center gap-4 bg-[#333333] rounded-lg p-8 text-gray-200 shadow-[0_0_10px_rgba(0,0,0,0.5)]"
                    onSubmit={loginAccount}
                    noValidate
                    >
                    <h1 className="text-4xl text-center font-bold font-roboto">Login</h1>
        
                    <div className="flex flex-col gap-1">
                        <label htmlFor="email">Email</label>
                        <Input 
                            type="text" 
                            placeholder="Enter Email" 
                            onChange={handleInput} 
                            name="email" 
                            value={formValues.email}
                            className={inputClass}
                            />
                    </div>
                    
                    <div className="flex flex-col gap-1">
                        <label htmlFor="password">Password</label>
                        <Input 
                            type="password" 
                            placeholder="Enter Password" 
                            onChange={handleInput} 
                            name="password" 
                            value={formValues.password}
                            className= {inputClass}
                            />
                    </div>

                    <Button
                        type="submit"
                        text="Login"
                        className={"bg-yellow-500 px-5 py-3 mt-5 font-nunito rounded-md font-semibold text-lg hover:bg-yellow-600 transition-all ease-in-out duration-300 cursor-pointer"}
                    />

                    <p className="text-center font-poppins">Create an account?<span className="text-accent font-nunito hover:text-green-600 font-semibold cursor-pointer"><Link to="/signup"> Signup</Link></span> </p>

                </form>
            </div>
        </HomeLayout>
    )
}

export default Login;