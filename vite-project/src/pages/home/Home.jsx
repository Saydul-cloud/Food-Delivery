import React, { useState } from 'react' // ১ নম্বর লাইনে useState যুক্ত করা হয়েছে
import './Home.css'
import Header from '../../components/navbar/header/Header'
import ExploreMenu from '../../components/exploremenu/ExploreMenu'
import FoodDisplay from '../../components/fooddisplay/FoodDisplay'
import AppDownload from '../../components/appdownload/AppDownload'

const Home = () => {
 
  const [category, setCategory] = useState("All") // এটি এখন সঠিকভাবে কাজ করবে

  return (
    <div>
     <Header/>
     <ExploreMenu category={category} setCategory={setCategory}/>
     <FoodDisplay category={category} />
     <AppDownload />
    </div>
  )
}

export default Home
