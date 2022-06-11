import React from 'react'
import styles from './styles.module.css'

function Post({ title, description, imageUrl }) {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.imageTag}>
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

export default Post