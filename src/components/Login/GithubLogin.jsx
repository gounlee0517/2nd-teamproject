import React from 'react';
import { GithubAuthProvider, browserSessionPersistence, getAuth, setPersistence, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/modules/userInfo';
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
        const tmp = {
          email: auth.currentUser.email,
          nickname: auth.currentUser.displayName || '이름을 설정하세요',
          profileImg:
            auth.currentUser.photoURL ||
            'https://img.freepik.com/premium-vector/default-profile-picture-ui-element-template_106317-36159.jpg'
        };
        dispatch(setUser(tmp));
        sessionStorage.setItem('userInfo', JSON.stringify(tmp));
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
`;

export default GithubLogin;
