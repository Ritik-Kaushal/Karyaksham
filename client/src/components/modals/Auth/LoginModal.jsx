import React, { useState } from 'react';
import store from "@/store/baseStore";
import ModalPortal from '@/components/ModalPortal';
import { login } from '@/store/userStore';
import axios from 'axios';
import { DASHBOARD_PAGE, LOGIN_URL } from '@/utils/constant';
import { useRouter } from 'next/router';

export default function LoginModal() {
    const router = useRouter();
    const [login_id, setLoginId] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState("");

    function handleLogin() {
        setLoading("loading");
        const body = {
            login_id: login_id,
            password: password
        }
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        axios.post(LOGIN_URL, body, config).then((res) => {
            setLoading("");
            store.dispatch(login(res.data.username));
            localStorage.setItem("token",res.data.token);
            document.getElementById('login-modal').checked = false;
            console.log("Done till here");
            if(router.asPath === "/" || router.asPath==="/#" ) router.push(DASHBOARD_PAGE);

        }).catch((err) => {
            setLoading("");
            if (err.response && err.response.data) setError(err.response.data);
            else setError(["Something went wrong."]);

        })
    }
    return (
        <ModalPortal>
            <input type="checkbox" id="login-modal" className="modal-toggle" />
            <label htmlFor="login-modal" className="modal cursor-pointer">
                <label className="modal-box relative" htmlFor="">
                    <h3 className="text-lg font-bold text-center">Login</h3>
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
                        <input type="text" value={login_id} onChange={(e) => { setLoginId(e.target.value); setError(""); }} name="login-id" id="login-id" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label for="login-id" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Username or email</label>
                    </div>

                    <div className="relative z-0 w-full mb-6 group">
                        <input type="password" value={password} onChange={(e) => { setPassword(e.target.value); setError(""); }} name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label for="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                    </div>


                    {login_id && password && !error ? <button className={`create-task-Button btn btn-outline btn-info float-right ${loading}`} onClick={handleLogin}>Login</button> : <button className="btn btn-outline btn-error float-right cursor-not-allowed">Login</button>}
                </label>
            </label>
        </ModalPortal>
    )
}



