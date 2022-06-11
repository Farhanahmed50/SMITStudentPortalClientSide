import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css'


function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorShow, setErrorShow] = useState(false);

    const navigate = useNavigate();
    const handleSubmit = async(e) => {
        e.preventDefault();
        const adminLogin = {
            adminEmail : email,
            adminPassword : password
        }
        const response = await fetch("https://smit-student-portal.herokuapp.com/admin/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(adminLogin)
        })
        response.json()
            .then(data => {
                if (response.status === 201) {
                    console.log("Success")
                    console.log(data.token)
                    navigate('../admin')
                    localStorage.removeItem("AdminLogin");
                    localStorage.setItem("AdminLogin", data.token)
                }
                else {
                    setErrorShow("* Invalid email or password")
                }
            })

    }

    return (
        <div className={styles.mainContainer}>
            <h1 className={styles.heading}>Welcome Back!</h1>
            <h2 className={styles.secondHeading}>Login for Admin</h2>
            <form className={styles.form} onSubmit={handleSubmit}>
                <input type="text" className={styles.inputText} onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" />
                <input type="password" className={styles.inputText} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                {
                    errorShow &&
                    <span className={styles.errorShow}>{errorShow}</span>
                }
                <span className={styles.remember}>
                    <input type='checkbox' /> Remember me
                </span>
                <input type="submit" className={styles.button} value="Log In" />
            </form>
        </div>
    )
}

export default Login