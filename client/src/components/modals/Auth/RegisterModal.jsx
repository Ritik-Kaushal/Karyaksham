import React, {useState} from 'react'
import ModalPortal from '@/components/ModalPortal';
import axios from 'axios';
import { REGISTER_URL } from '@/utils/constant';

export default function RegisterModal() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm_password, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState("");

    function handleRegister() {
        if (password !== confirm_password) {
            setError("Password and Confirm Password must match.");
            return;
        }
        setLoading("loading");
        const body = {
            username:username,
            email:email,
            password:password,
            confirm_password:confirm_password
        }
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        axios.post(REGISTER_URL,body,config).then((res)=>{
            setLoading("");
            document.getElementById('register-modal').checked = false;
            document.getElementById('login-modal').checked = true;


        }).catch((err)=>{
            setLoading("");
            if(err.response && err.response.data) setError(err.response.data);
            else setError(["Something went wrong."]);
        })
    }


    return (
        <ModalPortal>
            <input type="checkbox" id="register-modal" className="modal-toggle" />
            <label htmlFor="register-modal" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                    <h3 className="text-lg font-bold text-center">Register</h3>
                    <br></br>
                    {error && <><div className="alert alert-error shadow-lg">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            {error.map((err)=>(
                                <span>{err}</span>    
                            ))}
                        </div>
                    </div>
                        <br></br></>}
                    <div className="relative z-0 w-full mb-6 group">
                        <input type="text" value={username} onChange={(e) => { setUsername(e.target.value); setError(""); }} name="username" id="username" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label for="username" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Username</label>
                    </div>

                    <div className="relative z-0 w-full mb-6 group">
                        <input type="email" value={email} onChange={(e) => { setEmail(e.target.value); setError(""); }} name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label for="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</label>
                    </div>



                    <div className="relative z-0 w-full mb-6 group">
                        <input type="password" value={password} onChange={(e) => { setPassword(e.target.value); setError(""); }} name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label for="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                    </div>

                    <div className="relative z-0 w-full mb-6 group">
                        <input type="password" value={confirm_password} onChange={(e) => { setConfirmPassword(e.target.value); setError(""); }} name="confirm_password" id="confirm_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label for="confirm_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm Password</label>
                    </div>


                    {username && email && password && confirm_password && !error ? <button className={`create-task-Button btn btn-outline btn-info float-right ${loading}`} onClick={handleRegister}>Register</button> : <button className="btn btn-outline btn-error float-right cursor-not-allowed">Register</button>}
                </label>
            </label>
        </ModalPortal>
    )
}



