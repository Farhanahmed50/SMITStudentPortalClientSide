import React from 'react'
import { Routes, Route } from 'react-router-dom'
import AddCourse from '../Pages/Admin/Courses/AddCourse/AddCourse'
import Courses from '../Pages/Admin/Courses/Courses'
import EditCourse from '../Pages/Admin/Courses/EditCourse/EditCourse'
import Home from '../Pages/Admin/Home/Home'
import Login from '../Pages/Admin/Login/Login'
import Posts from '../Pages/Admin/Posts/Posts'
import AddPost from '../Pages/Admin/Posts/AddPost/AddPost'
import EditPost from '../Pages/Admin/Posts/EditPost/EditPost'

function AdminRoutes() {
    return (
        <Routes>
            <Route path='/admin' element={<Home />} />
            <Route path='/admin/login' element={<Login />} />
            <Route path='/admin/courses' element={<Courses />} />
            <Route path={'/admin/courses/addCourse'} element={<AddCourse />} />
            <Route path='/admin/courses/editCourse/:id' element={<EditCourse />} />
            <Route path={'/admin/posts'} element={<Posts />} />
            <Route path={'/admin/posts/addPost'} element={<AddPost />} />
            <Route path={'/admin/posts/editPost/:id'} element={<EditPost />} />
        </Routes>
    )
}

export default AdminRoutes