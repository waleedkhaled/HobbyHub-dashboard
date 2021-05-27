import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import authService from '../services/auth-service';
import { useHistory } from 'react-router-dom';

const Auth: React.FC = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    useEffect(() => {
        authService.logout();
    }, []);


    return (
        <div className="flex items-center min-h-screen bg-white dark:bg-gray-900">
            <div className="container mx-auto">

                <div className="max-w-md mx-auto my-10">
                    <div className="text-center">
                        <div className=''>
                            <p className='text-primary-500 text-4xl font-bold text-shadow-sm'>Hobby Hub</p>
                        </div>
                        <h1 className="my-3 text-3xl font-semibold text-gray-700 dark:text-gray-200">Sign in</h1>
                        <p className="text-gray-500 dark:text-gray-400">Sign in to your admin account</p>
                    </div>
                    <div className="m-7">
                        <form action="">
                            <div className="mb-6">
                                <label htmlFor="email" className="block mb-2 text-sm text-gray-600 dark:text-gray-400">Username</label>
                                <input name="email" id="email" placeholder="Enter your Username"
                                    className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-primary-100 focus:border-primary-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                                    required onChange={e => { setEmail(e.target.value) }} />
                            </div>
                            <div className="mb-6">
                                <div className="flex justify-between mb-2">
                                    <label htmlFor="password" className="text-sm text-gray-600 dark:text-gray-400">Password</label>
                                    {/* <a href="#!" className="text-sm text-gray-400 focus:outline-none focus:text-primary-500 hover:text-primary-500 dark:hover:text-primary-300">Forgot password?</a> */}
                                </div>
                                <input type="password" name="password" id="password" placeholder="Enter your Password"
                                    className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-primary-100 focus:border-primary-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                                    required onChange={e => { setPassword(e.target.value) }} />
                            </div>
                            <div className="mb-6 ">
                                {/* <Link to='/'> */}
                                <button className="w-full px-50 px-3 py-4 text-white bg-primary-500 rounded-md focus:bg-primary-600 focus:outline-none font-bold" onClick={
                                    () => {
                                        console.log("username: ", email);
                                        console.log("password: ", password);
                                        authService.login(email, password)?.then((data) => {
                                            console.log("login: ", data)
                                            if (localStorage.getItem('user') != null)
                                                history.push('/')
                                        }).catch((error)=>{
                                            console.log(error)
                                        })
                                    }
                                }>
                                    Sign in
                          </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth;