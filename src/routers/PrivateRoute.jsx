import React, { useContext } from 'react'
import { AuthContext } from '../Context/AuthProvider'
import { Navigate, useLocation } from 'react-router'

const PrivateRoute = ({children}) => {
  const {user,loading} = useContext(AuthContext)
  const location = useLocation()

  if(loading){
    return (
      <div className="flex justify-center items-center py-6">
      <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
    )
  }

  if(user){
    return children
  }
  return <Navigate to='/login' state={{from: location}}></Navigate>
}

export default PrivateRoute