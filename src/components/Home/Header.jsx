import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getAuth } from 'firebase/auth';
import { useSelector, useDispatch } from 'react-redux';
import { setIslogined } from '../../redux/modules/isLogined';

function Header() {
  const navigate = useNavigate();
  const onLogOutClick = () => {
    const auth = getAuth();
    auth.signOut();
    navigate('/');
  };

  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state);
  console.log('header: ', isLogin.isLogined);
  return (
    <>
      <STheader>
        <STh1
          onClick={() => {
            navigate('/');
          }}
        >
          thanks diary
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
                logout
              </STli>

              <STli>my page</STli>
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

const STheader = styled.div`
  height: 60px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: pink;
`;
const STh1 = styled.h1`
  margin-left: 20px;
  cursor: pointer;
`;
const STul = styled.ul`
  display: flex;
`;
const STli = styled.li`
  margin-right: 20px;
  cursor: pointer;
`;

export default Header;
