import React, { useEffect, useState } from 'react'
import AdminNavs from '../../../../Components/AdminNavs/AdminNavs'
import styles from './styles.module.css'
import PageNotFound from '../../../404/PageNotFound';
import { useParams, useNavigate } from 'react-router-dom'

function EditPost() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [isAuth, setIsAuth] = useState(false);
    const [postData, setPostData] = useState(false)
    const navigate = useNavigate();
    const params = useParams();
    const { id } = params



    useEffect(() => {
        (async () => {
            console.log(id)
            try {
                const token = localStorage.getItem("AdminLogin");
                if (token) {
                    const response = await fetch(`https://smit-student-portal.herokuapp.com/post/findPost/${id}`, {
                        method: "GET",
                        headers: {
                            'authorization': token,
                            'Content-Type': 'application/json',
                        }
                    })
                    response.json()
                        .then((data) => {
                            if (response.status === 201) {
                                console.log("Success")
                                setIsAuth(true)
                                setPostData(data.post);
                                setTitle(data.post.title);
                                setDescription(data.post.description);
                                setImageUrl(data.post.imageUrl)
                                // set title
                            }

                        })
                        .catch(error => {
                            console.log(error);
                        })
                }
            } catch (error) {
                console.log(error)
            }
        })()
    }, [isAuth])


    const handleSubmit = async(e) => {
        e.preventDefault();
        const updatedData = {
            title,
            description,
            imageUrl
        }
        const response = await fetch(`https://smit-student-portal.herokuapp.com/post/update/${id}`, {
            method: "PATCH",
            headers: {
                'authorization': localStorage.getItem("AdminLogin"),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData)
        })
        response.json()
            .then(() => {
                if (response.status === 201) {
                    console.log("Successfully Updated")
                    alert("Successfully Updated");
                    navigate("../../../admin/posts")
                }

            })
            .catch(error => {
                console.log(error);
            })

    }
    return (
        <div>
            <AdminNavs />
            {
                postData ?
                    <div className={styles.mainContainer}>
                        <form onSubmit={handleSubmit} className={styles.form}>
                            <h1 className={styles.heading}>Edit Post</h1>
                            <label className={styles.lable}>Post Title</label>
                            <input value={title} type="text" className={styles.inputText} placeholder='Enter Post Title' onChange={e => setTitle(e.target.value)} required />
                            <label className={styles.lable}>Post Description</label>
                            <input value={description} type="text" className={styles.inputText} placeholder='Enter Post Description' onChange={e => setDescription(e.target.value)} required />
                            <label className={styles.lable}>Cover Photo URL</label>
                            <input value={imageUrl} type="text" className={styles.inputText} placeholder='Enter Image URL' onChange={e => setImageUrl(e.target.value)} required />
                            <input type='submit' className={styles.button} value='Edit Post' />
                        </form>
                    </div> :
                    <PageNotFound />
            }
        </div>
    )
}

export default EditPost