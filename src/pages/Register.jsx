import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../Context/AuthProvider';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import useAxios from '../hooks/useAxios';
import useImageUpload from '../hooks/useImageUpload';

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
      // Upload image first
      const imageUrl = await uploadImage(file);
      if (!imageUrl) return;

      // Create user
      const userCredential = await createUser(email, password);
      const user = userCredential.user;

      // Update profile
      await updateUserProfile({
        displayName: name,
        photoURL: imageUrl
      });

      // Create updated user object with new info
      const updatedUser = {
        ...user,
        displayName: name,
        photoURL: imageUrl
      };

      // Update state immediately
      setUser(updatedUser);

      // Save to database
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

      // Update state immediately
      setUser(user);

      // Save to database
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
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded shadow mt-10">
      <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800 dark:text-white">Register</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

        <button
          className="btn btn-primary w-full mt-6"
          type="submit"
          disabled={uploading}
        >
          {uploading ? "Uploading Image..." : "Register"}
        </button>
      </form>

      <div className="divider my-6">OR</div>

      <button
        onClick={handleGoogle}
        className="btn w-full bg-white text-black border hover:bg-gray-100 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600"
      >
        Continue with Google
      </button>
    </div>
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
