import React, { useEffect, useState } from 'react'
import Navs from '../../Components/Navs'
import Posts from './Posts/Posts'

function Home() {

  return (
    <div>
      <Navs />
      <Posts />
    </div>
  )
}

export default Home