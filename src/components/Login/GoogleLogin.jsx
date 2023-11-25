import React from 'react';
import { browserSessionPersistence, getAuth, GoogleAuthProvider, setPersistence, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setIslogined } from '../../redux/modules/isLogined';

function GoogleLogin() {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const signInWithGoogle = () => {
    setPersistence(auth, browserSessionPersistence);
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        dispatch(setIslogined(true));
        navigate('/');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
      });
  };

  return (
    <div>
      <button onClick={signInWithGoogle}>구글 로그인</button>
    </div>
  );
}

export default GoogleLogin;
