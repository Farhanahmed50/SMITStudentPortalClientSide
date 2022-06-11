import React, { useState } from 'react'
import logo from './Images/2.png';
import styles from './signup.module.css';
import { useNavigate } from 'react-router-dom'

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleLogIn = () => {
        navigate("../login")
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const signUpData = {
            name,
            email,
            password
        }

        const response = await fetch("https://smit-student-portal.herokuapp.com/signup", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(signUpData)
        })
        response.json()
            .then(data => {
                if (response.status === 201) {
                    console.log("Success")
                    console.log(data.token)
                    navigate('../login')
                    // localStorage.removeItem("Token")
                    // localStorage.setItem("Token", data.token)
                }
            })
    }
    return (
        <div className={styles.mainContainer}>
            <div className={styles.side1}>
                <h1 className={styles.heading}>SMIT Student Portal</h1>
                <img className={styles.imageTag} src={logo} alt="Logo" />
            </div>

            <div className={styles.side2}>
                <form onSubmit={handleSubmit}>

                    <h1 className={styles.secondHeading}>Welcome!</h1>
                    <h2 className={styles.thirdCopy}>Sign Up for get free IT courses</h2>

                    <label className={styles.label}>Full Name</label>
                    <br />
                    <input className={styles.inputTags} type="text" id="name" placeholder="Enter Your Full Name" onChange={e => setName(e.target.value)} required />
                    <br />

                    <label className={styles.label}>Email</label>
                    <br />
                    <input className={styles.inputTags} type="email" id="email" placeholder="Enter Your Email" onChange={e => setEmail(e.target.value)} required />
                    <br />

                    <label className={styles.label}>Password</label>
                    <br />
                    <input className={styles.inputTags} type="password" id="password" placeholder="Enter Password" onChange={e => setPassword(e.target.value)} required />
                    <br />

                    <input type="checkbox" className={styles.checkbox} />
                    <label className={styles.remember}>Agree to the Teams & Contitions</label>
                    <br />
                    <input type='submit' value="Sign Up" className={styles.button} />
                    <br />
                    <span className={styles.sign}>Already have an account? <span className={styles.signUp} onClick={handleLogIn}>Log In</span></span>
                </form>
            </div>
        </div>
    )
}


export default Signup