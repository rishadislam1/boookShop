import React from 'react';
import { FaGoogle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../Redux/hook';
import { googleLogin, logInUser } from '../../Redux/feature/user/userSlice';
import Swal from 'sweetalert2';

const Login = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleOnSubmit = (e: { target: any; preventDefault: () => void }) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
    
        dispatch(logInUser({ email, password })).then((data) => {

          if (data.error) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: `${data.error.message}`,
            });
          } else {
            navigate('/');
          
          }
        });
    
        form.reset();
      };
    
  const handleGoogleLogin = ()=>{
    dispatch(googleLogin())
    .then(data=>{
      if(data.meta.requestStatus === 'fulfilled'){
        navigate('/')
      }
    })
  }
    return (
        <section className="bg-gray-50 dark:bg-gray-900">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
     
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleOnSubmit}>
                  <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
                  </div>
                  <div>
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                  </div>
               
                  <button
                type="submit"
                className="w-full text-white bg-blue-500 rounded-xl hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Login
              </button>
               
              </form>

              <p className=" font-bold text-gray-500 dark:text-gray-400 flex flex-col justify-center items-center">
              Or
              <h1>Login With</h1>
              <button onClick={handleGoogleLogin} className="mt-5 border border-yellow-500 p-3 rounded-full hover:text-white hover:bg-yellow-600">
                <FaGoogle />
              </button>
            </p>

            <p className="text-sm font-light text-gray-500 dark:text-gray-400 flex justify-center items-center">
              Already have an account?{" "}
              <Link
                to="/signup"
                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Signup here
              </Link>
            </p>

          </div>
      </div>
  </div>
</section>
    );
};

export default Login;