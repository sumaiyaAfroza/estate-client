import React, { use, useEffect, useState } from 'react'
import { AuthContext } from '../Context/AuthProvider'
import axios from 'axios'
import SingleMarathon from './SingleMarathon'

const Sort = () => {
    const [item,setItem] = useState([])
    
    useEffect(()=>{
      const fetchSortItem = async ()=>{
        try {
          const response = await axios.get(`${import.meta.env.VITE_SERVER}/marathons?sort=-createdAt&limit=6`);
          setItem(response?.data.slice(0,6))
        } catch (error) {
          console.log(error)
        }
      }
      fetchSortItem()
    },[])

  return (
    <div className='grid grid-cols-1 px-6 lg:grid-cols-3 gap-4'> 
      {
        item.map(data => <SingleMarathon data={data}></SingleMarathon> )
      }
      
    </div>
  )
}

export default Sort  