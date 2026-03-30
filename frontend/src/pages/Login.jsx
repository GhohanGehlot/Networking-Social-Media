import React, { useEffect } from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import useAuth from '../store/useAuthStore';
import { toast } from 'react-toastify';
import { Riple } from 'react-loading-indicators'

const Login = () => {

    const navigate = useNavigate();
    const loginToken = useAuth(state => state.login);
    const fetchUser = useAuth(state => state.fetchUser);
    const Loading = useAuth(state => state.Loading)

    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const [isLoading , setIsLoading] = useState(false);





   async function onSubmitHandler  (e){
        e.preventDefault();
        setIsLoading(true)
       try {
        await loginToken(email , password)
        await fetchUser();
       } catch (error) {
         toast.error(error.message)
       }
        finally{
        setIsLoading(false)
       }
    }

  return (
    <>
     

     { isLoading ? 
     <Riple color="#ff000000" size="medium" /> :
       <form onSubmit={onSubmitHandler} className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white border border-gray-200 rounded-2xl p-10 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">NetSocio</h1>
        <p className="text-sm text-gray-400 mb-8">Welcome back, sign in to continue</p>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-500 tracking-wide">Email address</label>
            <input 
            type="email" 
            placeholder="john@example.com" 
            className="h-10 px-3 rounded-lg border border-gray-200 bg-gray-50 text-sm text-gray-900 outline-none focus:border-gray-400" 
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-500 tracking-wide">Password</label>
            <input 
            type="password"
            placeholder="Your password"
            className="h-10 px-3 rounded-lg border border-gray-200 bg-gray-50 text-sm text-gray-900 outline-none focus:border-gray-400"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            />
          </div>

          <button type='submit' className="mt-2 h-10 bg-gray-900 text-white text-sm font-medium rounded-lg tracking-wide">
            Sign in
          </button>
        </div>

        <p className="text-xs text-gray-400 text-center mt-5">
          Don't have an account? <span onClick={() => navigate('/register')} className="text-gray-900 font-medium cursor-pointer">Register</span>
        </p>
      </div>
    </form>}
    

    </>
    
  )
}


export default Login