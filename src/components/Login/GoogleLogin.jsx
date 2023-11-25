import React from 'react';
import { browserSessionPersistence, getAuth, GoogleAuthProvider, setPersistence, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setIslogined } from '../../redux/modules/isLogined';
import styled from 'styled-components';

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
      <GoogleLoginBtn onClick={signInWithGoogle}>Google</GoogleLoginBtn>
    </div>
  );
}

const GoogleLoginBtn = styled.button`
  border-style: none;
  background-color: #ff6f74;
  color: white;
  padding: 10px 20px;
  font-family: 'Ageo Personal Use';
  font-weight: bold;
`

export default GoogleLogin;
