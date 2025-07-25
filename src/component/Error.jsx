import React from 'react'
import { Link } from 'react-router'
 import error from "../assets/error.jpg"


const Error = () => {
  return (
   
    <div>
        <div className=" flex items-center justify-center min-h-screen ">
      <div className=" rounded-lg  p-8 max-w-2xl text-center">
       
        <img
          src={error}
          alt="404 Robot"
          className="mx-auto mb-6"
        />
        <h1 className="text-4xl font-bold text-indigo-500 mb-2">
        404 - Oops! Real-Estate-properties not found.
        </h1>
        <p className="text-black text-xl mb-6">
        The group you're looking for doesn't exist or the page has moved
        </p>
        <Link to="/">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition cursor-pointer">
            Go Back Home
          </button>
        </Link>
      </div>
    </div>
    </div>
  )
}
export default Error