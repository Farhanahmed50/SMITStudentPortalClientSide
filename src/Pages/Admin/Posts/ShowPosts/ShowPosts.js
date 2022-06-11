import React from 'react'
import styles from './styles.module.css'

function ShowPosts({ title, description, imageUrl, onDelete, onEdit }) {
    return (
        <div className={styles.mainContainer}>
            <div className={styles.imageTag}>
                <div className={styles.actionButtons}>
                    <button onClick={onDelete} className={styles.delete}>Delete</button>
                    <button onClick={onEdit} className={styles.edit}>Edit</button>
                </div>
                <img src={imageUrl} alt="Post Cover" className={styles.image} />
            </div>
            <div className={styles.texts}>
                <span className={styles.title}>{title}</span>
                <span className={styles.description}>{description}</span>
                <span className={styles.hrTag}></span>
            </div>
        </div>
    )
}

export default ShowPosts