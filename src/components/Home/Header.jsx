import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getAuth, onAuthStateChanged, setPersistence } from 'firebase/auth';
import { useSelector, useDispatch } from 'react-redux';
import { setIslogined } from '../../redux/modules/isLogined';

function Header() {
  const navigate = useNavigate();
  const onLogOutClick = () => {
    const auth = getAuth();
    auth.signOut();
    navigate('/');
  };

  const myPageClick = () => {
    const auth = getAuth();
    navigate('/mypage/' + auth.currentUser.uid);
  };

  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state);
  console.log('header: ', isLogin.isLogined);
  console.log(sessionStorage.length);
  return (
    <>
      <STheader>
        <STh1
          onClick={() => {
            navigate('/');
          }}
        >
          Thanks diary
        </STh1>
        <STul>
          {isLogin.isLogined ? (
            <>
              <STli
                onClick={() => {
                  onLogOutClick();
                  dispatch(setIslogined(false));
                }}
              >
                Logout
              </STli>
              &nbsp;&nbsp;
              <STli
                onClick={() => {
                  myPageClick();
                }}
              >
                my page
              </STli>
            </>
          ) : (
            <>
              <STli
                onClick={() => {
                  navigate('/Login');
                }}
              >
                login
              </STli>
            </>
          )}
        </STul>
      </STheader>
    </>
  );
}

const STheader = styled.header`
  width: 80%;
  height: 60px;
  margin: 0 auto;
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: transparent;
`;
const STh1 = styled.h2`
  cursor: pointer;
`;
const STul = styled.ul`
  display: flex;
`;
const STli = styled.li`
  cursor: pointer;
`;

export default Header;
