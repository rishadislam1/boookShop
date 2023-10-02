import React from 'react';
import Navbar from '../Pages/Shared/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../Pages/Shared/Footer/Footer';
import { useAppDispatch } from '../Redux/hook';
import { useEffect } from 'react';
import { auth } from '../firebase/firebase.config';
import { onAuthStateChanged } from 'firebase/auth';
import { setLoading, setUser } from '../Redux/feature/user/userSlice';
const Main = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
      dispatch(setLoading(true));
      onAuthStateChanged(auth, (user) => {
        if(user){
          dispatch(setUser(user.email));
          dispatch(setLoading(false))
        }
        else{
          dispatch(setLoading(false))
        }
      });
    }, [dispatch]);
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Main;