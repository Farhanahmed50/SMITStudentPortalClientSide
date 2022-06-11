import React, { useEffect, useState } from 'react';
import ShowCourse from './ShowCourse/ShowCourse';
import styles from './styles.module.css'
import { NavLink, useNavigate } from 'react-router-dom'
import AdminNavs from '../../../Components/AdminNavs/AdminNavs'
import { auth } from '../../../Components/AdminAuth';


function Courses() {
  const [courses, setCourses] = useState("");
  const [isAvailable, setIsAvailable] = useState(false);
  const [id, setId] = useState("");
  const [isAuth, setIsAuth] = useState(false)
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("./addCourse")
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
              console.log(response.status)
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
  const handleEdit = (e) => {
    console.log(e);
  }
  useEffect(() => {
    if (isAuth && id) {
      navigate("../../../admin/courses/editCourse/" + id);
    }
  } , [id])

  const ShowCourses = () => {
    return (
      <div className={styles.courses} >
        {
          isAvailable &&
          courses.map((course, index) => {
            return (
              <ShowCourse key={index} coverImage={course.image} onEditClick={() => setId(course._id)} courseName={course.courseName} duration={course.duration} instructorName={course.instructorName} price={course.price} status={course.status} />
            )
          })
        }
      </div>
    )
  }
  useEffect(() => {
    (async () => {
      const response = await fetch("https://smit-student-portal.herokuapp.com/course/allCourses", {
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        },
      })
      response.json()
        .then(data => {

          console.log(data.courses)
          if (response.status === 201) {
            // navigate('../')
            setCourses(data.courses);
            setIsAvailable(true);
          }
          else {
            // setErrorShow("Invalid email or password")
          }
        })
    })();
  }, [])
  return (
    <div className={styles.mainContainer}>
      <AdminNavs />
      <div className={styles.side2}>
        {/* <NavLink to="addCourse">Add Course</NavLink> */}
        <button className={styles.addCourse} onClick={handleClick}>Add Course</button>
        <div className={styles.courses}>
          {isAvailable &&
            <ShowCourses />
          }
        </div>
      </div>
    </div>
  )
}

export default Courses