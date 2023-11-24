import React from 'react';
import { GithubAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function GithubLogin() {
  const provider = new GithubAuthProvider();
  const auth = getAuth();
  const navigate = useNavigate();

  const signInWithGithub = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        navigate('/')
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
