import React from 'react'
import styles from './styles.module.css'

function PageNotFound() {
  return (
    <div className={styles.mainContainer}>
      <h1 className={styles.heading}>404</h1>
      <h2 className={styles.text}>Page Not Found</h2>
    </div>
  )
}

export default PageNotFound