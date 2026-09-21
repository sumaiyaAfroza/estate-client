import { Link, useLocation, useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";
import { motion } from "framer-motion";

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
        toast.success("Login Successful! Welcome back!");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        toast.error(`Login failed: ${error.message}`);
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
        toast.success("Google Login Successful! Welcome back!");
        navigate("/");
      })
      .catch((error) => {
        toast.error(`Google Login failed: ${error.message}`);
      });
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const inputVariants = {
    rest: { scale: 1, opacity: 0.8 },
    hover: { scale: 1.02, opacity: 1 },
    focus: { scale: 1.02, opacity: 1, borderColor: "#e11d48" },
  };

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
      <Toaster position="top-center" />
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

          {/* Forgot Password link */}
          <div className="mt-4 text-center">
            <Link to="/forgot-password" className="text-sm text-emerald-600 dark:text-emerald-400 hover:underline">
              Forgot Password?
            </Link>
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
