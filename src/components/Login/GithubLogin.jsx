import React from 'react';
import { GithubAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setIslogined } from '../../redux/modules/isLogined';

function GithubLogin() {
  const provider = new GithubAuthProvider();
  const auth = getAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signInWithGithub = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
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
    <>
      <button onClick={signInWithGithub}>깃허브 로그인</button>
    </>
  );
}

export default GithubLogin;
