import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../Context/AuthProvider';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router';
import useAxios from '../hooks/useAxios';
import useImageUpload from '../hooks/useImageUpload';
import { motion } from "framer-motion";

const Register = () => {
  const { createUser, setUser, googleLogin, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const axiosInstance = useAxios();
  const { uploadImage, uploading } = useImageUpload();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    const { email, password, name, image } = data;
    const file = image[0];

    if (!file) {
      toast.error("Please select an image.");
      return;
    }

    try {
      const imageUrl = await uploadImage(file);
      if (!imageUrl) return;

      const userCredential = await createUser(email, password);
      const user = userCredential.user;

      await updateUserProfile({
        displayName: name,
        photoURL: imageUrl
      });

      const updatedUser = {
        ...user,
        displayName: name,
        photoURL: imageUrl
      };

      setUser(updatedUser);

      const userInfo = {
        name: name,
        email: email,
        image: imageUrl,
        role: 'user'
      };

      await axiosInstance.post('/users', userInfo);
      
      toast.success('Registration successful!');
      navigate('/');
    } catch (err) {
      toast.error(err.message || 'Registration failed');
    }
  };

  const handleGoogle = async () => {
    try {
      const res = await googleLogin();
      const user = res.user;
      setUser(user);

      const userInfo = {
        name: user.displayName,
        email: user.email,
        image: user.photoURL,
        role: "user"
      };

      await axiosInstance.post('/users', userInfo);
      
      toast.success("Google login successful!");
      navigate("/");
    } catch (err) {
      toast.error(err.message || 'Google login failed');
    }
  };

  return (
    <motion.div
      className="max-w-md mx-auto p-6 bg-white mb-10 dark:bg-gray-800 rounded shadow mt-10"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.h2 
        className="text-2xl font-semibold text-center mb-6 text-gray-800 dark:text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Register
      </motion.h2>

      <motion.form 
        onSubmit={handleSubmit(onSubmit)} 
        className="space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        {/* Name */}
        <div>
          <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Name</label>
          <input
            {...register('name', { required: 'Name is required' })}
            type="text"
            placeholder="Name"
            className="w-full input input-bordered"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Profile Image</label>
          <input
            {...register('image', { required: 'Image is required' })}
            type="file"
            accept="image/*"
            className="w-full file-input file-input-bordered"
          />
          {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Email</label>
          <input
            {...register('email', { 
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address"
              }
            })}
            type="email"
            placeholder="Email"
            className="w-full input input-bordered"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm text-gray-600 dark:text-gray-400 mb-1">Password</label>
          <input
            {...register('password', {
              required: "Password is required",
              minLength: { value: 6, message: "Must be at least 6 characters" },
              pattern: {
                value: /^(?=.*[A-Z])(?=.*[!@#$%^&*])/,
                message: 'Must include one uppercase and one special character',
              },
            })}
            type="password"
            placeholder="Password"
            className="w-full input input-bordered"
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white w-full mt-6"
          type="submit"
          disabled={uploading}
        >
          {uploading ? "Uploading Image..." : "Register"}
        </motion.button>
      </motion.form>

      <div className="divider my-6">OR</div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleGoogle}
        className="btn w-full bg-white text-black border hover:bg-gray-100 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600"
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
        <span className='text-lg'> Continue with Google</span>
      </motion.button>

      <motion.h1 
        className='text-center my-4'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <span className='text-gray-600'> Already have an account? </span>
        <Link to='/login' className=' font-semibold text-green-800'>login</Link>
      </motion.h1>
    </motion.div>
  );
};

export default Register;







// import React, { useContext } from 'react';
// import { useForm } from 'react-hook-form';
// import { AuthContext } from '../Context/AuthProvider';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router';
// import useAxios from '../hooks/useAxios';
// import useImageUpload from '../hooks/useImageUpload';

// const Register = () => {
//   const { createUser,setUser, googleLogin ,updateUserProfile} = useContext(AuthContext);
//   const navigate = useNavigate();
//   const axiosInstance = useAxios();
//   const { uploadImage, uploading } = useImageUpload();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors }
//   } = useForm();

//   const onSubmit = async (data) => {
//     const { email, password, name, image } = data;
//     const file = image[0];

//     if (!file) {
//       toast.error("Please select an image.");
//       return;
//     }

//     try {
//       const imageUrl = await uploadImage(file); // Upload to imgbb
//       if (!imageUrl) return;

//        createUser(email, password)
//        .then(async(result)=>{

//         console.log(result.user);
//        })
      

//       const userInfo = {
//         name: name,
//         email: email,
//         image: imageUrl,
//         role: 'user'
//       };

//       const result = await axiosInstance.post('/users', userInfo);
//       console.log(result.data);

     
//       updateUserProfile({displayName: name,
//         photoURL:imageUrl})
//       .then(()=>{
//         console.log('profile');
//       }).catch(error=>{
//         console.log(error);
//       })


//       toast.success('Registration successful!');
//       navigate('/');
//     } catch (err) {
//       toast.error(err.message);
//     }
//   };

//   const handleGoogle = () => {
//     googleLogin()
//       .then(async (res) => {
//         const user = res.user;

//         const userInfo = {
//           name: user.displayName,
//           email: user.email,
//           image: user.photoURL,
//           role: "user"
//         };

//         const result = await axiosInstance.post('/users', userInfo);
//         console.log(result.data);
//         toast.success("Google login successful!");
//         navigate("/");
//       })
//       .catch((err) => toast.error(err.message));
//   };

//   return (
//     <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded shadow mt-10">
//       <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800 dark:text-white">Register</h2>

//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//         {/* Name */}
//         <label className="text-sm text-gray-600 dark:text-gray-400">Name</label>
//         <input
//           {...register('name', { required: 'Name is required' })}
//           type="text"
//           placeholder="Name"
//           className="w-full input input-bordered"
//         />
//         {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

//         {/* Image Upload */}
//         <label className="text-sm text-gray-600 dark:text-gray-400">Image</label>
//         <input
//           {...register('image', { required: 'Image is required' })}
//           type="file"
//           accept="image/*"
//           className="w-full file-input file-input-bordered"
//         />
//         {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}

//         {/* Email */}
//         <label className="text-sm text-gray-600 dark:text-gray-400">Email</label>
//         <input
//           {...register('email', { required: 'Email is required' })}
//           type="email"
//           placeholder="Email"
//           className="w-full input input-bordered"
//         />
//         {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

//         {/* Password */}
//         <label className="text-sm text-gray-600 dark:text-gray-400">Password</label>
//         <input
//           {...register('password', {
//             required: true,
//             minLength: { value: 6, message: "Must be at least 6 characters" },
//             pattern: {
//               value: /^(?=.*[A-Z])(?=.*[!@#$%^&*])/,
//               message: 'Must include one uppercase and one special character',
//             },
//           })}
//           type="password"
//           placeholder="Password"
//           className="w-full input input-bordered"
//         />
//         {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

//         <button
//           className="btn btn-primary w-full"
//           type="submit"
//           disabled={uploading}
//         >
//           {uploading ? "Uploading Image..." : "Register"}
//         </button>
//       </form>

//       <div className="divider">OR</div>

//       <button
//         onClick={handleGoogle}
//         className="btn w-full bg-white text-black border hover:bg-gray-100"
//       >
//         Continue with Google
//       </button>
//     </div>
//   );
// };

// export default Register;
