'use client'


import { Login as userlogin } from '@/lib/login/Login';
import React, { useState } from 'react'
import "./globals.css"
import ValidationError from '@/components/errors/ValidationError';
import { useRouter } from 'next/navigation';
import Loader from '@/components/loader/Loader';

const Login = () => {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false);

  const validateUsername = (e) => {
    setUsername(e.target.value)
  }
  const validatePassword = (e) => {
    setPassword(e.target.value)
  }



  const handleLogin = async (e) => {
    try {

      e.preventDefault()
      setLoading(true);
      console.log("first")
      if (username.length === 0) {
        throw new ValidationError('invalid username')
      }
      if (password.length === 0) {
        throw new ValidationError('invalid password')

      }
      const res = await userlogin(username, password)
      console.log(res)
      localStorage.setItem("auth", res.headers.auth)
      localStorage.setItem("username", res.data.username)
      localStorage.setItem("isAdmin", res.data.isAdmin)
      localStorage.setItem("id", res.data.id)
      if (!res?.data.id) {
        throw new ValidationError("invalid id")
      }
      if (res.data.isAdmin == true) {
        router.push('/admin')
        alert('Login Done', { variant: "success" })
        return
      }
      else {
        router.push('/user')
        alert('Login Done', { variant: "success" })
        return


      }
    }
    catch (error) {

    }
    finally {
      setLoading(false);
    }
  }

  const handleForget = () => {
    router.push('/forget/')
  }


  // return (
  //   <>

  //     <div className="card login-container">
  //       <div className="card-body">
  //         <form className="login-form">
  //           <div className="mb-3">
  //             <label htmlFor="username" className="form-label">
  //               Username
  //             </label>
  //             <input
  //               type="username"
  //               className="form-control"
  //               id="username"
  //               onChange={validateUsername}
  //               placeholder="Enter your username"
  //             />
  //           </div>
  //           <div className="mb-3">
  //             <label htmlFor="inputPassword3" className="form-label">
  //               Password
  //             </label>
  //             <input
  //               type="password"
  //               className="form-control"
  //               id="inputPassword3"
  //               onChange={validatePassword}
  //               placeholder="Enter your password"
  //             />
  //           </div>

  //           <button type="button" className="btn btn-primary login-button" onClick={handleLogin}>
  //             Sign in
  //           </button>
  //           <button type="button" className="btn btn-primary login-button" >
  //             Forget Password
  //           </button>
  //         </form>
  //       </div>
  //     </div>
  //   </>
  // );

  return (
    <>
      {loading && <Loader />}
      <div className="flex justify-center items-center h-screen">
        <div className="w-full max-w-xs">
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <form className="login-form">
              <div className="mb-4">
                <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter your username"
                  onChange={validateUsername}
                />
              </div>
              <div className="mb-6">
                <label htmlFor="inputPassword3" className="block text-gray-700 text-sm font-bold mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="inputPassword3"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter your password"
                  onChange={validatePassword}
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={handleLogin}
                >
                  Sign In
                </button>
                <button type="button" className="text-blue-500 hover:text-blue-700" onClick={handleForget}>
                  Forget Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}




export default Login