import React from 'react'
import styles from './styles.module.css'

function NavButtons({text, isEnable, onClick}) {
  return (
    <div>
      <div onClick={onClick} className={ isEnable ? styles.activeNav : styles.inActiveNav}>{text}</div>
    </div>
  )
}

export default NavButtons