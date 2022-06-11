import React, { useEffect, useState } from 'react'
import AdminNavs from '../../../Components/AdminNavs/AdminNavs'
import { auth } from '../../../Components/AdminAuth'
import { useNavigate } from 'react-router-dom';

function Home() {
  const [isAuth , setIsAuth] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    auth().then((data) => {
      setIsAuth(data);
    })
    setTimeout(() => {
      if (isAuth) {
        navigate("../../admin/courses")
      }
      else{ 
        navigate("../../admin/login")
      }
    },3000)
    console.log(isAuth)
  }, [isAuth])
  return (
    <div>
      <AdminNavs />
    </div>
  )
}

export default Home