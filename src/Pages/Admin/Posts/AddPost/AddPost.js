import React, { useState } from 'react'
import AdminNavs from '../../../../Components/AdminNavs/AdminNavs'
import styles from './styles.module.css'
import { useNavigate } from 'react-router-dom'

function AddPost() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const addPost = {
      title,
      description,
      imageUrl
    }
    const adminLogin = localStorage.getItem("AdminLogin");
    if (adminLogin) {
      const response = await fetch("https://smit-student-portal.herokuapp.com/post/add", {
        method: "POST",
        headers: {
          'authorization': adminLogin,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(addPost)
      })
      response.json()
        .then(() => {
          console.log("Success")
          if (response.status === 201) {
            navigate("../../../admin/posts");
            // console.log("Success")
            // console.log(data.token)
            // navigate('../admin')
            // localStorage.setItem("AdminLogin", data.token)
          }
          else {
            // setErrorShow("* Invalid email or password")
          }
        })
        .catch(error => {
          console.log(error);
          alert("Something went wrong");
        })
    }
  }


  return (
    <div>
      <AdminNavs />
      <div className={styles.mainContainer}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <h1 className={styles.heading}>Add Post</h1>
          <label className={styles.lable}>Post Title</label>
          <input type="text" className={styles.inputText} placeholder='Enter Post Title' onChange={e => setTitle(e.target.value)} required />
          <label className={styles.lable}>Post Description</label>
          <input type="text" className={styles.inputText} placeholder='Enter Post Description' onChange={e => setDescription(e.target.value)} required />
          <label className={styles.lable}>Cover Photo URL</label>
          <input type="text" className={styles.inputText} placeholder='Enter Image URL' onChange={e => setImageUrl(e.target.value)} required />
          <input type='submit' className={styles.button} value='Add Post' />
        </form>
      </div>
    </div>
  )
}

export default AddPost