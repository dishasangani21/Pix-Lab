
import React from 'react'
import Category from "../components/Category"
import CardList from "../components/Image/CardList"

const MainPage = () => {
  return (
    <div className='flex'>
    
      <div className=' flex flex-col'>
      <Category/>
      <CardList/>
      </div>

      
    </div>
  )
}

export default MainPage
