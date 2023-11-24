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
        // const credential = GithubAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        // const user = result.user;
        navigate('/')
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        // const credential = GithubAuthProvider.credentialFromError(error);
      });
  };

  return (
    <>
      <button onClick={signInWithGithub}>깃허브 로그인</button>
    </>
  );
}

export default GithubLogin;
