import React, { createContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile
} from "firebase/auth";
import { app } from '../../firebase';

export const AuthContext = createContext(null);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  const login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };


   const createUser = (email,password)=>{
    setLoading(true)
    return createUserWithEmailAndPassword(auth,email,password)
   }

   const updateUserProfile = profileInfo=>{
    return updateProfile(auth.currentUser, profileInfo)
   }



  // const createUser = (email, password, name, photoURL) => {
  //   setLoading(true);
  //   return createUserWithEmailAndPassword(auth, email, password,name,photoURL)
  //     .then((userCredential) => {
  //       return updateProfile(userCredential.user, {
  //         displayName: name,
  //         photoURL: photoURL || null,
  //       }).then(() => {
  //         // Force reload of the user state with new profile
  //         setUser({ ...userCredential.user, displayName: name, photoURL });
  //         return userCredential;
  //       });
  //     });
  // };

  
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      console.log('🔐 Current User:', currentUser);
    });
    return () => unsubscribe();
  }, []);

  const userInfo = {
    user,
    setUser,
    loading,
    setLoading,
    googleLogin,
    login,
    logOut,
    createUser,
    updateUserProfile
  };

  return (
    <AuthContext.Provider value={userInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;





// import React, { createContext, useEffect, useState } from 'react';
// import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
// import { app } from '../../firebase';

// export const AuthContext = createContext(null);
// const auth = getAuth(app);
// const provider = new GoogleAuthProvider();

// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const googleLogin = () => {
//     setLoading(true);
//     return signInWithPopup(auth, provider);
//   };

//   const login = (email, password) => {
//     setLoading(true);
//     return signInWithEmailAndPassword(auth, email, password);
//   };

  // const createUser = (email, password, name, photoURL) => {
  //   setLoading(true);
  //   return createUserWithEmailAndPassword(auth, email, password)
  //     .then((userCredential) => {
        
  //       return updateProfile(userCredential.user, {
  //         displayName: name,
  //         photoURL: photoURL || null, 
  //       }).then(() => userCredential);
  //     });
  // };

//   const logOut = () => {
//     setLoading(true);
//     return signOut(auth);
//   };

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//       setLoading(false);
//       console.log('Current User:', currentUser); 
//     });
//     return () => unsubscribe();
//   }, []);

//   const userInfo = {
//     googleLogin,
//     user,
//     setUser,
//     logOut,
//     loading,
//     setLoading,
//     login,
//     createUser,
//   };

//   return (
//     <AuthContext.Provider value={userInfo}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthProvider;