import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import AdminNavs from '../../../Components/AdminNavs/AdminNavs'
import ShowPosts from './ShowPosts/ShowPosts';
import styles from './styles.module.css'

function Posts() {
  const [posts, setPosts] = useState([]);
  const [isAuth, setIsAuth] = useState(false);

  const isedited = async (editedId) => {
    if (isAuth && editedId) {
      navigate(`./editPost/${editedId}`)
    }
  }


  const isdeleted = async (dltedId) => {
    if (isAuth && dltedId) {
      if (window.confirm("Are you sure? \nIf yes! press ok")) {
        const token = localStorage.getItem("AdminLogin");
        const response = await fetch(`https://smit-student-portal.herokuapp.com/post/delete/${dltedId}`, {
          method: "DELETE",
          headers: {
            'authorization': token,
            'Content-Type': 'application/json',
          }
        })
        response.json()
          .then(() => {
            if (response.status === 201) {
              alert("Post deleted successfully")
              window.location.reload()
            }
            else {
              alert("Something went wrong");
            }
          })
          .catch((error) => {
            console.log(error)
            alert("Something went wrong");
          })
      }

    }
  }

  const navigate = useNavigate();

  const handleAddPost = () => {
    navigate("../../../admin/posts/addPost")
  }

  const DisplayPosts = () => {
    return (
      <div className={styles.postsDiv}>
        {posts && posts.map((post, index) => {
          return (
            <div key={index}>
              <ShowPosts key={index} onDelete={() => {
                isdeleted(post._id)
              }
              } onEdit={() => {
                isedited(post._id)
              }} title={post.title} description={post.description} imageUrl={post.imageUrl} />
            </div>
          )
        })
        }
      </div>
    )
  }

  useEffect(() => {
    // (async () => {
    //   const response = await fetch("http://localhost:5000/post/fetchAll", {
    //     method: "GET",
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //   })
    //   response.json()
    //     .then(data => {

    //       console.log(data.posts)
    //       if (response.status === 201) {
    //         // navigate('../')
    //         setPosts(data.posts);
    //         // setIsAvailable(true);
    //       }
    //       else {
    //         // setErrorShow("Invalid email or password")
    //       }
    //     })
    // })();
    (async () => {

      try {
        const token = localStorage.getItem("AdminLogin");
        if (token) {
          const response = await fetch("https://smit-student-portal.herokuapp.com/post/adminFetchAll", {
            method: "GET",
            headers: {
              'authorization': token,
              'Content-Type': 'application/json',
            }
          })
          await response.json()
            .then(
              (data) => {
                if (response) {
                  if (response.status === 201) {
                    setIsAuth(true);
                    setPosts(data.posts)
                  }
                  else {
                    navigate('../../../admin/login')
                  }
                }
              })

        }
        else {
          console.log("Admin Not Authorized")
        }
      } catch (error) {
        // return error
        console.log(error)
      }
    })()

  }, [isAuth])

  return (
    <div className={styles.mainContainer}>
      <AdminNavs />
      <div className={styles.postContainer}>
        <button className={styles.addPost} onClick={handleAddPost}>Add Post</button>
        <DisplayPosts />
      </div>
    </div>
  )
}

export default Posts