import React, { useEffect, useState } from 'react'
import Card from './Card.jsx'
import Vid_dataset from "./Vid_dataset.js"
import Loading from '../Loading.jsx'

const CardList = () => {
  const [data , setData ] = useState([])
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    setLoading(true)
    setData(Vid_dataset)
    setLoading(false)
  }, [])

  // console.log(data[2].videos.large.url)


  if (loading) {
    return (
      <div className="w-full ml-[230%] h-[90vh] flex items-center justify-center">
        <Loading />
      </div>
    );
  }

 

  return (
    <div className=' pl-[15%] mt-16 grid grid-cols-4'>

      {
        data.map((item, index)=>{

         return <Card key={index} img = {item.videos.small.url} like={item.likes} tags={item.tags} user={item.user} userImg={item.userImageURL} id= {item.id}  />
          
        })
      }
      
    
    </div>
  )
}

export default CardList
