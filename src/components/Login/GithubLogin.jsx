import React from 'react';
import { GithubAuthProvider, browserSessionPersistence, getAuth, setPersistence, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setIslogined } from '../../redux/modules/isLogined';
import styled from 'styled-components';

function GithubLogin() {
  const provider = new GithubAuthProvider();
  const auth = getAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signInWithGithub = () => {
    setPersistence(auth, browserSessionPersistence);
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
      <GithubLoginBtn onClick={signInWithGithub}>Github</GithubLoginBtn>
    </>
  );
}
const GithubLoginBtn = styled.button`
  background-color: #707070;
  color: white;
  border-style: none;
  padding: 10px;
  font-family: 'Ageo Personal Use';
  font-weight: bold;
`

export default GithubLogin;
