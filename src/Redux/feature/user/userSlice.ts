

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth } from '../../../firebase/firebase.config';

interface IUser {
  user:{
    email: string | null
  };
  isLoading: boolean;
  isError: boolean;
  error: string | null;
}

interface ICredintial{
    email: string,
    password: string
}

const initialState: IUser = {
    user: {
        email: null
    },
    isLoading: false,
    isError: false,
    error: null
};

export const createUser = createAsyncThunk('user/createUser', async ({email,password}:ICredintial)=>{
  
    const data = await createUserWithEmailAndPassword(auth,email,password);
  
    return data.user.email
   
})

export const googleLogin = createAsyncThunk('user/googleLogin', async ()=>{
    const provider = new GoogleAuthProvider();
    const data = await signInWithPopup(auth,provider);
    return data.user.email;
})

export const logInUser = createAsyncThunk('user/createUser', async ({email,password}:ICredintial)=>{
    const data = await signInWithEmailAndPassword(auth,email,password);
    return data.user.email
})

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers:{
        setUser: (state, action:PayloadAction<string | null>)=>{
            state.user.email = action.payload;
        },
        setLoading: (state,action:PayloadAction<boolean>) =>{
            state.isLoading = action.payload;
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(createUser.pending, (state)=>{
            state.isLoading = true;
            state.isError= false;
            state.error = null;
        }).addCase(createUser.fulfilled, (state, action)=>{
            state.user.email = action.payload;
            state.isLoading= false;
        }).addCase(createUser.rejected, (state,action)=>{
            state.user.email= null;
            state.isError= true;
            state.isLoading=false;
            state.error = action.error.message!;
        })
       
    },
    extraReducers: (builder)=>{
        builder.addCase(logInUser.pending, (state)=>{
            state.isLoading = true;
            state.isError= false;
            state.error = null;
        }).addCase(logInUser.fulfilled, (state, action)=>{
            state.user.email = action.payload;
            state.isLoading= false;
        }).addCase(logInUser.rejected, (state,action)=>{
            state.user.email= null;
            state.isError= true;
            state.isLoading=false;
            state.error = action.error.message!;
        })
    }
});


export const {setUser, setLoading} =  userSlice.actions;
export default userSlice.reducer;