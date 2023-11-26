import React from 'react';
import { browserSessionPersistence, getAuth, GoogleAuthProvider, setPersistence, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/modules/userInfo';
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
        const tmp = {
          email: auth.currentUser.email,
          nickname: auth.currentUser.displayName || '이름을 설정하세요',
          profileImg:
            auth.currentUser.photoURL ||
            'https://img.freepik.com/premium-vector/default-profile-picture-ui-element-template_106317-36159.jpg'
        };
        dispatch(setUser(tmp));
        sessionStorage.setItem('userInfo', JSON.stringify(tmp));
        // console.log(JSON.parse(sessionStorage.getItem('userInfo')));

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
`;

export default GoogleLogin;
