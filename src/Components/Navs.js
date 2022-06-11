import React, { useState, useEffect } from 'react'
import styles from './style.module.css'
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom'

function Navs({ authentication, authenticationData }) {
    const [isAuth, setIsAuth] = useState(false);
    const [authData, setAuthData] = useState('');
    const [home, setHome] = useState(false);
    const [courses, setCourses] = useState(false);
    const [contactUs, setContactUs] = useState(false);
    const [profile, setProfile] = useState(false);


    const location = useLocation();

    const navigate = useNavigate()
    const path = location.pathname
    const spt = path.slice(0, 8);

    useEffect(() => {
        if (path === "/") {
            setHome(true)
            setCourses(false)
            setContactUs(false)
            setProfile(false)
        }
        else if (path === "/courses") {
            setHome(false)
            setCourses(true)
            setContactUs(false)
            setProfile(false)
        }
        else if (path === "/contactUs") {
            setHome(false)
            setCourses(false)
            setContactUs(true)
            setProfile(false)
        }
        else if (spt === "/profile") {
            setHome(false)
            setCourses(false)
            setContactUs(false)
            setProfile(true)
        }
        else {
            setHome(false)
            setCourses(false)
            setContactUs(false)
            setProfile(false)
        }
    }, [path, spt])

    const handleLogout = () => {
        localStorage.removeItem("Token");
        window.location.reload()
    }

    const handleSignUp = () => {
        navigate("../../../signup")
    }

    const handleHome = () => {
        navigate("../")
    }
    const handleCourses = () => {
        navigate("../../courses")
    }
    const handleContactUs = () => {
        navigate("../../contactUs")
    }
    const handleProfile = () => {
        navigate("../../")
    }


    // useEffect(() => {
    //     auth()
    //         .then((data) => {
    //             setIsAuth(data);
    //         })
    //     console.log(isAuth)
    // }, [auth()
    //     .then((data) => {
    //         setIsAuth(data);
    //     })])

    const handleLogin = () => {
        navigate("/login")
    }

    useEffect(() => {
        (async () => {
            try {
                const token = localStorage.getItem("Token");
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
                                setAuthData(data)
                                authentication(true)
                                authenticationData(data)
                                
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
    }, [])

    return (
        <div className={styles.mainContainer}>
            <span className={styles.heading} onClick={handleHome}>SMIT</span>
            <div className={styles.buttons}>
                <span className={home ? styles.selected : styles.button} onClick={handleHome}>Home</span>
                <span className={courses ? styles.selected : styles.button} onClick={handleCourses}>Courses</span>
                <span className={contactUs ? styles.selected : styles.button} onClick={handleContactUs}>Contact us</span>
            </div>
            {
                isAuth ?
                    <>
                        <div className={styles.profileButtons}>
                            <span className={profile ? styles.selected : styles.button} onClick={handleProfile}><span className={styles.letter}>{authData.name[0]}</span><span className={styles.profileName}>{authData.name}</span></span>
                            <span className={styles.logoutButton} onClick={handleLogout} >Log Out</span>
                        </div>
                    </>
                    :
                    <div className={styles.logButtons}>
                        <span className={styles.logoutButton} onClick={handleLogin}>Log In</span>
                        <span className={styles.joinFree} onClick={handleSignUp}>Join Free</span>
                    </div>
            }
        </div>
    )
}


export default Navs