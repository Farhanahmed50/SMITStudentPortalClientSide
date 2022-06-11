import React, { useState } from 'react';
// import './login.module.css';
import logo from './Images/1.png';
import styles from './login.module.css'
import { useNavigate } from 'react-router-dom'
// import {Link} from 'react-router-dom';


function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorShow, setErrorShow] = useState(false);

    const handleSignUp = () => {
        navigate("../signup")
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const loginData = {
            email,
            password
        }

        const response = await fetch("https://smit-student-portal.herokuapp.com/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        })
        response.json()
            .then(data => {
                if (response.status === 201) {
                    console.log("Success")
                    console.log(data.token)
                    navigate('../')
                    localStorage.removeItem("Token")
                    localStorage.setItem("Token", data.token)
                }
                else {
                    setErrorShow("* Invalid email or password")
                }
            })

    }
    return (
        <div className={styles.mainContainer}>
            <div className={styles.side1}>
                <h1 className={styles.heading}>SMIT Student Portal</h1>
                <img className={styles.image} src={logo} alt="Logo" />
            </div>

            <div className={styles.side2}>
                <form onSubmit={handleSubmit}>

                    <h1 className={styles.secondHeading} >Hello!</h1>
                    <h2 className={styles.thirdHeading}>Login now to get all updates</h2>

                    <label className={styles.label}>Email</label>
                    <br />
                    <input type="email" className={styles.email} placeholder="Enter Your Email" onChange={e => setEmail(e.target.value)} />
                    <br />

                    <label className={styles.label}>Password</label>
                    <br />
                    <input type="password" className={styles.password} placeholder="Enter Password" onChange={e => setPassword(e.target.value)} />
                    <br />
                    {
                        errorShow && 
                        <span className={styles.errorShow}>{errorShow}</span>
                    }
                    <br />
                    <input type="checkbox" className={styles.checkbox} />
                    <label className={styles.remember}>Remember me</label>
                    <span className={styles.forgot}>Forgot Password?</span>
                    <br />
                    <input type='submit' value="Login" className={styles.button} />
                    <br />

                    <span className={styles.sign}>Don't have an account? <span className={styles.signUp} onClick={handleSignUp}>Sign Up</span></span>
                </form>
            </div>
        </div>
    );
}

export default Login;