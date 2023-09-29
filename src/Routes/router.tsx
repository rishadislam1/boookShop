import React from 'react'

import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Main from '../Layout/Main';
import Signup from '../Pages/Signup/Signup';
import Login from '../Pages/Login/Login';
import AllBooks from '../Pages/AllBooks/AllBooks';

const router = createBrowserRouter([
    {
        path:'/',
        element: <Main></Main>,
        children:[
            {
                path:'/',
                element:<Home></Home>
            },
            {
                path: '/allbook',
                element:<AllBooks></AllBooks>
            },
            {
                path: '/signup',
                element: <Signup></Signup>
            },
            {
                path: '/login',
                element: <Login></Login>
            }
        ]
    }
])

export default router;