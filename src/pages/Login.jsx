import React, { useEffect, useState } from 'react';
import { auth, provider } from '../firebase-config';
import { signInWithPopup, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer';

const Login = ({ setIsAuth }) => {
  
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // Check if the user is already logged in
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const yourUserId ='MGMdMFPFywSuXAp0ra737OyRRU32';
        if (user.uid === yourUserId) {
          // User is authorized
          setIsAuthorized(true);
          console.log(yourUserId);
          setIsAuth(true);
          localStorage.setItem('isAuth', true); // Store auth status in localStorage
        }
       
        else {
          // User is not authorized, sign them out
          signOut(auth);
          alert('Only authorized users can login')
          localStorage.removeItem('isAuth'); // Remove auth status from localStorage
         

        }
      } else {
        setIsAuth(false);
        setIsAuthorized(false);
        localStorage.removeItem('isAuth'); // Remove auth status from localStorage
        
      }
    });

    // Unsubscribe from the auth state listener when the component unmounts
    return () => unsubscribe();
  }, [setIsAuth]);

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      setIsAuth(true);
      setIsAuthorized(true);
      localStorage.setItem('isAuth', true); // Store auth status in localStorage
      navigate('/');
    });
  };

  return (
    <>
    <div className="loginPage">
      {isAuthorized ? (
        <p>Already Authorized</p>
      ) : (
        <div>
          <p>Sign In With Google to Continue</p>
          <button className="login-with-google-btn" onClick={signInWithGoogle}>
            Sign in with Google
          </button>
        </div>
      )}
    </div>
    <Footer/>
    </>
  );
};

export default Login;
