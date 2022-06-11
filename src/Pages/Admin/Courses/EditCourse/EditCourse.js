import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import AdminNavs from '../../../../Components/AdminNavs/AdminNavs';
import styles from './styles.module.css'
import PageNotFound from '../../../404/PageNotFound'


function EditCourse() {
  const [isAuth, setIsAuth] = useState(false);
  const [courseName, setCourseName] = useState("");
  const [instructorName, setInstructorName] = useState("");
  const [status, setStatus] = useState();
  const [course, setCourse] = useState();
  const [isAvailable, setIsAvailable] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updateData = {
      courseName,
      instructorName,
      status
    }
    try {
      const token = localStorage.getItem("AdminLogin");
      if (token) {
        const response = await fetch(`https://smit-student-portal.herokuapp.com/course/update/${id}`, {
          method: "PATCH",
          headers: {
            'authorization': token,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updateData)
        })
        if (response) {
          if (response.status === 201) {
            alert("Course Update Successfully")
            navigate('../../../admin/courses')
          }
          else {
            alert("Something went wrong")
            // navigate('../../../admin/login')
          }
        }
        else {
          console.log(response.status)
        }

      }
      else {
        console.log("Something went wrong")
      }
    } catch (error) {
      // return error
      console.log(error)
    }
  }
  const handleSelect = (e) => {
    setStatus(e.target.value)
  }

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
          if (response) {
            if (response.status === 201) {
              setIsAuth(true);
            }
            else {
              console.log(response.status);
              navigate('../../../admin/login')
            }
          }
          else {
            console.log(response.status)
          }

        }
        else {
          console.log("Admin Not Authorized")
        }
      } catch (error) {
        // return error
        console.log(error)
      }
    })()
  }, [isAuth])
  const params = useParams();
  const navigate = useNavigate();

  const { id } = params
  console.log(id)

  useEffect(() => {
    (async () => {
      const response = await fetch(`https://smit-student-portal.herokuapp.com/course/findCourse/${id}`, {
        method: "GET",
        headers: {
          'authorization': localStorage.getItem("AdminLogin"),
          'Content-Type': 'application/json'
        },
      })
      response.json()
        .then(data => {

          console.log(data.course)
          if (response.status === 201) {
            // navigate('../')
            setCourse(data.course);
            setCourseName(data.course.courseName)
            setInstructorName(data.course.instructorName)
            setIsAvailable(true);
          }
          else {
            // setErrorShow("Invalid email or password")
          }
        })
    })();
  }, [id, isAuth])

  return (
    <div>
      <AdminNavs />
      {isAvailable ?
      <div className={styles.mainContainer}>
        <h1 className={styles.heading}>Edit Course</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.lable}>Course Name</label>
          <input type="text" value={courseName} className={styles.inputText} placeholder='Enter Course Name' onChange={e => setCourseName(e.target.value)} required />
          <label className={styles.lable}>Instructor Name</label>
          <input type="text" value={instructorName} className={styles.inputText} placeholder='Enter Instructor Name' onChange={e => setInstructorName(e.target.value)} required />
          <label className={styles.lable}>Status</label>
          <select className={styles.select} onChange={handleSelect}>
            <option value={true}>Available</option>
            <option value={false}>Closed</option>
          </select>
          <input type='submit' className={styles.button} value='Edit Course' />
        </form>
      </div>
      : <PageNotFound />}
    </div>
  )
}

export default EditCourse