import React from 'react'
import { Routes as AppRoutes, Route } from 'react-router-dom'
import ContactUs from '../Pages/ContactUs/ContactUs'
import Courses from '../Pages/Courses/Courses'
import Home from '../Pages/Home/Home'
import Login from '../Pages/Login/Login'
import Signup from '../Pages/Signup/Signup'

function Routes() {
    return (
        <AppRoutes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="courses" element={<Courses />} />
            <Route path="contactUs" element={<ContactUs />} />

        </AppRoutes>
    )
}

export default Routes