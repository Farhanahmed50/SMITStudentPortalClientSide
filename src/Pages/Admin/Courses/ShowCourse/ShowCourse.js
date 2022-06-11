import React from 'react'
import styles from './styles.module.css'

function ShowCourse({ courseName, duration, instructorName, status, price, coverImage, onEditClick }) {
    
    return (
        <div className={styles.mainContainer}>
            <div className={styles.imageDiv}>
                <button className={styles.edit} onClick={onEditClick}>Edit</button>
                <img className={styles.coverPhoto} alt='Cover Photo' src={coverImage} />
            </div>
            <div className={styles.courseName}>{courseName}</div>
            <div className={styles.instructorName}>{instructorName}</div>
            <div className={styles.bottom}>
                <div className={styles.duration}>Duration : {duration}</div>
                <div className={status ? styles.statusAvailable : styles.statusClosed}>{status ? "Available" : "Closed"}</div>
            </div>
            <hr className={styles.hrTag} />
            <div className={styles.footer} >
                <button className={ status ? styles.button : styles.buttonDisable}>Enroll Now</button>
                <div className={styles.price}><del>{price} PKR</del> Free </div>
            </div>
        </div>
    )
}

export default ShowCourse