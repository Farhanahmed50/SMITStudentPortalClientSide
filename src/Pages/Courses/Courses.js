import React, { useState, useEffect } from 'react'
import Navs from '../../Components/Navs'
import { auth } from '../../Components/UserAuth';
import styles from './styles.module.css'
import images from '../../Assets/1.jpeg'
import Course from './Course/Course';
import { useNavigate } from 'react-router-dom'

function Courses() {
    const [isAvailable, setIsAvailable] = useState(false);
    const [courses, setCourses] = useState([]);
    const [isAuth, setIsAuth] = useState(false)
    const [authData, setAuthData] = useState()
    const navigate = useNavigate();
    // const [isAuth, setIsAuth] = useState(() => auth().then((data) => {
    //     setIsAuth(data);
    // })
    // );
    // useEffect(() => {
    //     // (async() => {
    //     //   )
    //     // console.log(isAuth)
    //     console.log(isAuth)
    // }, [courseId])

    const authentication = (e) => {
        if (e) {
            setIsAuth(true)
        }
    }

    const handleEnroll = (courseId) => {
        if (isAuth && courseId) {
            console.log(authData)
        }
        else {
            alert("You must login first")
            navigate("../../../login")
        }
    }

    

    const ShowCourses = () => {
        return (
            <div className={styles.courses} >
                {
                    isAvailable &&
                    courses.map((course, index) => {
                        return (
                            <Course key={index} onClick={() => { handleEnroll(course._id) }} coverImage={course.image} courseName={course.courseName} duration={course.duration} instructorName={course.instructorName} price={course.price} status={course.status} />
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
            <Navs authentication={authentication} />
            <img className={styles.images} alt='Cover Pic' src={images} />
            <div>
                <ShowCourses />
            </div>
        </div>
    )
}

export default Courses