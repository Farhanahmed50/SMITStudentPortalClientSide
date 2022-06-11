import React, { useState, useEffect } from 'react'
import AdminNavs from '../../../../Components/AdminNavs/AdminNavs';
import styles from './styles.module.css'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../../../Components/AdminAuth'

function AddCourse() {
  const [courseName, setCourseName] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [instructorName, setInstructorName] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [status, setStatus] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      try {
          const token = localStorage.getItem("AdminLogin");
          if (token) {
              const response = await fetch("https://smit-student-portal.herokuapp.com/auth", {
                  method: "POST",
                  headers: {
                      'authorization': token,
                      'Content-Type': 'application/json',
                  }
              })
              response.json()
                  .then((data) => {

                      if (response.status === 201) {
                          console.log("Success")
                          setIsAuth(true)
                          // setAuthData(data)
                      }
                  })
                  .catch(error => {
                      console.log(error);
                  })
          }
      } catch (error) {
          console.log(error)
          // navigate('../login');
      }
  })()
  }, [isAuth])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const addCourse = {
      courseName,
      instructorName,
      duration,
      price,
      status,
      image: imageURL
    }



    const adminLogin = localStorage.getItem("AdminLogin");
    if (adminLogin) {
      const response = await fetch("https://smit-student-portal.herokuapp.com/course/add", {
        method: "POST",
        headers: {
          'authorization': adminLogin,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(addCourse)
      })
      response.json()
        .then(() => {
          console.log("Success")
          if (response.status === 201) {
            navigate("../../../admin/courses");
            // console.log("Success")
            // console.log(data.token)
            // navigate('../admin')
            // localStorage.setItem("AdminLogin", data.token)
          }
          else {
            // setErrorShow("* Invalid email or password")
          }
        })
        .catch(error => {
          console.log(error);
          alert("Something went wrong");
        })
    }
  }

  const handleSelect = (e) => {
    setStatus(e.target.value)
  }

  return (
    <div>
      <AdminNavs />
      <div className={styles.mainContainer}>
        <h1 className={styles.heading}>Add Course</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.lable}>Course Name</label>
          <input type="text" className={styles.inputText} placeholder='Enter Course Name' onChange={e => setCourseName(e.target.value)} required />
          <label className={styles.lable}>Cover Photo URL</label>
          <input type="text" className={styles.inputText} placeholder='Enter Image URL' onChange={e => setImageURL(e.target.value)} required />
          <label className={styles.lable}>Instructor Name</label>
          <input type="text" className={styles.inputText} placeholder='Enter Instructor Name' onChange={e => setInstructorName(e.target.value)} required />
          <label className={styles.lable}>Market Price</label>
          <input type="number" className={styles.inputText} placeholder='Enter Market Price' onChange={e => setPrice(e.target.value)} required />
          <label className={styles.lable}>Duration</label>
          <input type="text" className={styles.inputText} placeholder="Enter Duration like '8 months'" onChange={e => setDuration(e.target.value)} required />
          <label className={styles.lable}>Status</label>
          <select className={styles.select} onChange={handleSelect}>
            <option value={true}>Available</option>
            <option value={false}>Closed</option>
          </select>
          <input type='submit' className={styles.button} value='Add Course' />
        </form>
      </div>
    </div>
  )
}

export default AddCourse