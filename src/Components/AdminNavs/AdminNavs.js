import React, { useEffect, useState } from 'react'
import NavButtons from './NavButtons/NavButtons'
import styles from './styles.module.css'
import { useNavigate, useLocation } from 'react-router-dom'


function AdminNavs() {
  const [activeCourse, setActiveCourse] = useState(true);
  const [activeStudents, setActiveStudents] = useState(false);
  const [activeLeaves, setActiveLeaves] = useState(false);
  const [activeSetting, setActiveSetting] = useState(false);
  const [activePosts, setActivePosts] = useState(false);
  const location = useLocation();
  const path = location.pathname
  const stpath = path.split("/")


  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("AdminLogin")
    navigate("../../../admin/login")
  }

  useEffect(() => {
    if (stpath[2] === "courses") {
      setActiveCourse(true)
      setActiveStudents(false)
      setActiveLeaves(false)
      setActiveSetting(false)
      setActivePosts(false)
    }
    else if(stpath[2] === "posts"){
      setActiveCourse(false)
      setActiveStudents(false)
      setActiveLeaves(false)
      setActiveSetting(false)
      setActivePosts(true)
    }
    else if(stpath[2] === "students"){
      setActiveCourse(false)
      setActiveStudents(true)
      setActiveLeaves(false)
      setActiveSetting(false)
      setActivePosts(false)
    }
    else if(stpath[2] === "leaves"){
      setActiveCourse(false)
      setActiveStudents(false)
      setActiveLeaves(true)
      setActiveSetting(false)
      setActivePosts(false)
    }
    else if(stpath[2] === "setting"){
      setActiveCourse(false)
      setActiveStudents(false)
      setActiveLeaves(false)
      setActiveSetting(true)
      setActivePosts(false)
    }
  })
  return (
    <div className={styles.mainContainer}>
      <h1 className={styles.mainHeading}>SMIT Admin</h1>
      <div className={styles.navItems}>
        <NavButtons isEnable={activeCourse} onClick={() => {navigate("../../../admin/courses")}} text="Courses" />
        <NavButtons isEnable={activePosts} onClick={() => {navigate("../../../admin/posts")}} text="Posts" />
        <NavButtons isEnable={activeStudents} onClick={() => {}} text="Students" />
        <NavButtons isEnable={activeLeaves} onClick={() => {}} text="Leaves" />
        <NavButtons isEnable={activeSetting} onClick={() => {}} text="Setting" />
      </div>
      <div className={styles.logout} onClick={handleLogout}>Logout</div>
    </div>
  )
}

export default AdminNavs