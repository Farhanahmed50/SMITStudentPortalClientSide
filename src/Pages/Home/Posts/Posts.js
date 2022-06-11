import React, { useEffect, useState } from 'react'
import Post from './Post/Post';
import styles from './styles.module.css'

function Posts() {
    const [posts, setPosts] = useState([]);
    const [isAvailable, setIsAvailable] = useState(false)

    const ShowPosts = () => {
        return (
            <div className={styles.mainPosts}>
                {
                    isAvailable && posts.map((post, index) => {
                        return (
                            <Post imageUrl={post.imageUrl} description={post.description} title={post.title} key={index} />
                        )
                    })
                }
            </div>
        )
    }

    useEffect(() => {
        (async () => {
            const response = await fetch("https://smit-student-portal.herokuapp.com/post/fetchAll", {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            response.json()
                .then(data => {
                    if (response.status === 201) {
                        // navigate('../')
                        setPosts(data.posts);
                        setIsAvailable(true);
                    }
                    else {
                        // setErrorShow("Invalid email or password")
                    }
                })
        })();

    }, [])



    return (
        <div>
            <ShowPosts />
        </div>
    )
}

export default Posts