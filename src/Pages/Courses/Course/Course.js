import React from 'react'
import styles from './styles.module.css'

function Course({ courseName, duration, instructorName, status, price, coverImage, onClick }) {
    return (
        <div className={styles.mainContainer} >
            <div className={styles.imageDiv}>
                <img className={styles.coverPhoto} alt='Cover Photo' src={coverImage} />
            </div>
            <div className={styles.courseName}>{courseName}</div>
            {/* <div className={styles.instructor}>Instructor</div> */}
            <div className={styles.instructorName}>{instructorName}</div>
            <div className={styles.bottom}>
                <div className={styles.duration}>Duration : {duration}</div>
                <div className={status ? styles.statusAvailable : styles.statusClosed}>{status ? "Available" : "Closed"}</div>
            </div>
            <hr className={styles.hrTag} />
            <div className={styles.footer} >
                <button onClick={status ? onClick : null} className={ status ? styles.button : styles.buttonDisable}>Enroll Now</button>
                <div className={styles.price}><del>{price} PKR</del> Free </div>
            </div>
        </div>
    )
}

export default Course