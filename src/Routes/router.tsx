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
import AddNewBook from '../Pages/AddNewBook/AddNewBook';
import PrivateRoute from './PrivateRoutes';
import BookDetails from '../Pages/AllBooks/BookDetails';
import UpdateBooks from '../Pages/AllBooks/UpdateBooks';

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
            },
            {
                path: '/addnewbook',
                element: <PrivateRoute><AddNewBook></AddNewBook></PrivateRoute>
            },
            {
                path: '/bookdetails/:id',
                element: <BookDetails></BookDetails>
            },
            {
                path: '/updatebooks/:id',
                element: <PrivateRoute><UpdateBooks></UpdateBooks></PrivateRoute>
            }
        ]
    }
])

export default router;