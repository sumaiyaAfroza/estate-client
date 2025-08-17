import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";
import { motion } from "framer-motion"; // Import Framer Motion

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { googleLogin, login } = useAuth();
  const axiosInstance = useAxios();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const onSubmit = (data) => {
    const { email, password } = data;

    login(email, password)
      .then((result) => {
        console.log("Login Successful:", result.user);
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.error("Login Error:", error.message);
        toast.error(`Login failed: ${error.message}`, {
          position: "top-center",
          autoClose: 3000,
          theme: "colored",
        });
      });
  };

  const googleForm = () => {
    googleLogin()
      .then(async (result) => {
        const user = result.user;
        const userInfo = {
          name: user.displayName,
          email: user.email,
          image: user.photoURL,
          role: "user",
        };

        await axiosInstance.post("/users", userInfo);

        console.log("Google Login Successful:", result.user);
        navigate("/");
      })
      .catch((error) => {
        console.error("Google Login Error:", error.message);
      });
  };

  // Animation variants for the form container
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  // Animation variants for input fields and buttons
  const inputVariants = {
    rest: { scale: 1, opacity: 0.8 },
    hover: { scale: 1.02, opacity: 1 },
    focus: { scale: 1.02, opacity: 1, borderColor: "#e11d48" },
  };

  // Animation variants for buttons
  const buttonVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-100 dark:bg-gray-900 py-6 flex flex-col justify-center sm:py-12"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-sky-500 dark:from-cyan-600 dark:to-sky-700 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <motion.div
          className="relative px-4 py-10 bg-white dark:bg-gray-800 shadow-lg sm:rounded-3xl sm:p-20"
          variants={containerVariants}
        >
          <div className="max-w-md mx-auto">
            <motion.h1
              className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Login
            </motion.h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-6">
                <div>
                  <motion.input
                    {...register("email", { required: "Email is required" })}
                    type="email"
                    placeholder="Email address"
                    className="peer h-10 w-full border-b-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder-transparent bg-transparent focus:outline-none focus:border-rose-600 dark:focus:border-rose-500"
                    variants={inputVariants}
                    initial="rest"
                    whileHover="hover"
                    whileFocus="focus"
                    transition={{ duration: 0.3 }}
                  />
                  <label className="text-sm text-gray-600 dark:text-gray-400">
                    Email Address
                  </label>
                  {errors.email && (
                    <motion.p
                      className="text-red-500 text-sm"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {errors.email.message}
                    </motion.p>
                  )}
                </div>

                <div>
                  <motion.input
                    {...register("password", { required: "Password is required" })}
                    type="password"
                    placeholder="Password"
                    className="peer h-10 w-full border-b-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 placeholder-transparent bg-transparent focus:outline-none focus:border-rose-600 dark:focus:border-rose-500"
                    variants={inputVariants}
                    initial="rest"
                    whileHover="hover"
                    whileFocus="focus"
                    transition={{ duration: 0.3 }}
                  />
                  <label className="text-sm text-gray-600 dark:text-gray-400">
                    Password
                  </label>
                  {errors.password && (
                    <motion.p
                      className="text-red-500 text-sm"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {errors.password.message}
                    </motion.p>
                  )}
                </div>

                <div>
                  <motion.button
                    type="submit"
                    className="w-full bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white py-2 rounded-md transition"
                    variants={buttonVariants}
                    initial="rest"
                    whileHover="hover"
                    whileTap="tap"
                    transition={{ duration: 0.3 }}
                  >
                    Submit
                  </motion.button>
                </div>
              </div>
            </form>
          </div>

          {/* Google Login */}
          <div className="w-full flex justify-center mt-6">
            <motion.button
              onClick={googleForm}
              className="flex items-center bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
              variants={buttonVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              transition={{ duration: 0.3 }}
            >
              <svg className="h-6 w-6 mr-2" viewBox="-0.5 0 48 48">
                <title>Google-color</title>
                <g fill="none" fillRule="evenodd">
                  <path
                    fill="#FBBC05"
                    d="M9.8,24C9.8,22.5 10.1,21 10.5,19.6L2.6,13.6C1.1,16.7 0.2,20.3 0.2,24C0.2,27.7 1.1,31.3 2.6,34.4L10.5,28.3C10.1,27 9.8,25.5 9.8,24Z"
                  />
                  <path
                    fill="#EB4335"
                    d="M23.7,10.1C27,10.1 30,11.3 32.4,13.2L39.2,6.4C35,2.8 29.7,0.5 23.7,0.5C14.4,0.5 6.4,5.8 2.6,13.6L10.5,19.6C12.4,14.1 17.5,10.1 23.7,10.1Z"
                  />
                  <path
                    fill="#34A853"
                    d="M23.7,37.9C17.5,37.9 12.4,33.9 10.5,28.4L2.6,34.4C6.4,42.2 14.4,47.5 23.7,47.5C29.4,47.5 34.9,45.4 39,41.6L31.5,35.8C29.4,37.1 26.7,37.9 23.7,37.9Z"
                  />
                  <path
                    fill="#4285F4"
                    d="M46.1,24C46.1,22.6 45.9,21.1 45.6,19.7H23.7V28.8H36.3C35.7,31.9 34,34.3 31.5,35.8L39,41.6C43.3,37.6 46.1,31.6 46.1,24Z"
                  />
                </g>
              </svg>
              <span>Continue with Google</span>
            </motion.button>
          </div>

          {/* Register link */}
          <div className="mt-6 text-sm flex justify-between items-center">
            <p className="text-gray-600 dark:text-gray-400">
              Don't have an account?
            </p>
            <motion.div
              variants={buttonVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              transition={{ duration: 0.3 }}
            >
              <Link
                to="/register"
                className="bg-cyan-500 dark:bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-600 dark:hover:bg-cyan-700 transition"
              >
                Register
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Login;

// ===============================================================

// import React, { useContext } from 'react';
// import { Link, useLocation, useNavigate } from 'react-router'; // Fixed import to use react-router-dom
// import { AuthContext } from '../Context/AuthProvider';
// import { toast } from 'react-toastify';
// import { useForm } from 'react-hook-form';

// const Login = () => {
//    const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//   } = useForm()

//   const { googleLogin, login } = useContext(AuthContext);
//   const location = useLocation()
//   const navigate = useNavigate();
//   const from = location.state?.from.pathname || '/'

//   const handleLogin = (e) => {
//   e.preventDefault();
//   const email = e.target.email.value;
//   const password = e.target.password.value;

//   login(email, password)
//     .then((result) => {
//       console.log('Login Successful:', result.user);
//       navigate(from, {replace: true} );
//     })
//     .catch((error) => {
//       console.error('Login Error:', error.message);

//       // ✅ Show toast error message
//       toast.error(`Login failed: ${error.message}`, {
//         position: 'top-center',
//         autoClose: 3000,
//         theme: 'colored',
//       });
//     });
// };

//   const googleForm = () => {
//     googleLogin()
//       .then((result) => {
//         console.log('Google Login Successful:', result.user);
//         navigate('/');
//       })
//       .catch((error) => {
//         console.error('Google Login Error:', error.message);
//       });
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-6 flex flex-col justify-center sm:py-12">
//       <div className="relative py-3 sm:max-w-xl sm:mx-auto">
//         <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-sky-500 dark:from-cyan-600 dark:to-sky-700 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
//         <div className="relative px-4 py-10 bg-white dark:bg-gray-800 shadow-lg sm:rounded-3xl sm:p-20">
//           <div className="max-w-md mx-auto">
//             <div>
//               <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
//                 Login
//               </h1>
//             </div>
//             <form onSubmit={handleLogin}>
//               <div className="divide-y divide-gray-200 dark:divide-gray-700">
//                 <div className="py-8 text-base leading-6 space-y-4 text-gray-700 dark:text-gray-300 sm:text-lg sm:leading-7">
//                   <div className="relative">
//                     <input
//                       autoComplete="off"
//                       id="email"
//                       name="email"
//                       type="text"
//                       className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-rose-600 dark:focus:border-rose-500 bg-transparent"
//                       placeholder="Email address"
//                     />
//                     <label
//                       htmlFor="email"
//                       className="absolute left-0 -top-3.5 text-gray-600 dark:text-gray-400 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 dark:peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 dark:peer-focus:text-gray-400 peer-focus:text-sm"
//                     >
//                       Email Address
//                     </label>
//                   </div>
//                   <div className="relative">
//                     <input
//                       autoComplete="off"
//                       id="password"
//                       name="password"
//                       type="password"
//                       className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:outline-none focus:border-rose-600 dark:focus:border-rose-500 bg-transparent"
//                       placeholder="Password"
//                     />
//                     <label
//                       htmlFor="password"
//                       className="absolute left-0 -top-3.5 text-gray-600 dark:text-gray-400 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 dark:peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 dark:peer-focus:text-gray-400 peer-focus:text-sm"
//                     >
//                       Password
//                     </label>
//                   </div>
//                   <div className="relative">
//                     <button className="bg-cyan-500 dark:bg-cyan-600 text-white rounded-md px-4 py-2 hover:bg-cyan-600 dark:hover:bg-cyan-700 transition">
//                       Submit
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </form>
//           </div>
//           <div className="w-full flex justify-center">
//             <button
//               onClick={googleForm}
//               className="flex items-center bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 dark:focus:ring-gray-400"
//             >
//               <svg
//                 className="h-6 w-6 mr-2"
//                 xmlns="http://www.w3.org/2000/svg"
//                 viewBox="-0.5 0 48 48"
//               >
//                 <title>Google-color</title>
//                 <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
//                   <g transform="translate(-401.000000, -860.000000)">
//                     <g transform="translate(401.000000, 860.000000)">
//                       <path
//                         d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
//                         fill="#FBBC05"
//                       ></path>
//                       <path
//                         d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
//                         fill="#EB4335"
//                       ></path>
//                       <path
//                         d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
//                         fill="#34A853"
//                       ></path>
//                       <path
//                         d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
//                         fill="#4285F4"
//                       ></path>
//                     </g>
//                   </g>
//                 </g>
//               </svg>
//               <span>Continue with Google</span>
//             </button>
//           </div>
//           <div className="mt-4 text-sm flex justify-between items-center">
//             <p className="text-gray-600 dark:text-gray-400 mr-3 md:mr-0">
//               If you don't have an account..
//             </p>
//             <button className="text-white bg-cyan-500 dark:bg-cyan-600 hover:bg-cyan-600 dark:hover:bg-cyan-700 rounded-xl py-2 px-5 font-semibold transition duration-300 hover:scale-110">
//               <Link to="/register">Register</Link>
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
