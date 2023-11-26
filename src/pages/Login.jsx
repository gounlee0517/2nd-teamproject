import { useEffect, useState } from 'react';
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  setPersistence,
  browserSessionPersistence
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Home/Header';
import Footer from '../components/Home/Footer';
import styled from 'styled-components';
import GoogleLogin from '../components/Login/GoogleLogin';
import GithubLogin from '../components/Login/GithubLogin';

import { useDispatch } from 'react-redux';
import { setIslogined } from '../redux/modules/isLogined';
import { setUser } from '../redux/modules/userInfo';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  provider.setCustomParameters({
    prompt: 'select_account'
  });

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log('user', user);
    });
  }, [auth]);

  const onChange = (event) => {
    const { name, value } = event.target;
    if (name === 'email') {
      setEmail(value);
    }
    if (name === 'password') {
      setPassword(value);
    }
  };

  const signIn = async (event) => {
    event.preventDefault();
    setPersistence(auth, browserSessionPersistence);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log(auth.currentUser);
      dispatch(setIslogined(true));
      const tmp = {
        email: auth.currentUser.email,
        nickname: auth.currentUser.displayName || '이름을 설정하세요',
        profileImg:
          auth.currentUser.photoURL ||
          'https://img.freepik.com/premium-vector/default-profile-picture-ui-element-template_106317-36159.jpg'
      };
      dispatch(setUser(tmp));
      sessionStorage.setItem('userInfo', JSON.stringify(tmp));

      alert('로그인에 성공하셨습니다');
      navigate('/');
    } catch (error) {
      console.log(error);
      alert('로그인에 실패하셨습니다');
    }
  };

  return (
    <>
      <Header />
      <STloginTxt>Login</STloginTxt>
      <STinputbox>
        <Img src="img/cloud.jpg" />
        <LoginInputSection>
          <LoginInput
            type="email"
            value={email}
            name="email"
            onChange={onChange}
            placeholder="email"
            required
          ></LoginInput>
          <br />
          <LoginInput
            type="password"
            value={password}
            name="password"
            onChange={onChange}
            placeholder="password"
            required
          ></LoginInput>
          <br />
          <SignupA
            onClick={() => {
              navigate('/signup');
            }}
          >
            signup
          </SignupA>
          <br />
          <LoginBtn onClick={signIn}>login</LoginBtn>
        </LoginInputSection>
        <SocialLoginBtn>
          <GithubLogin />
          <GoogleLogin />
        </SocialLoginBtn>
      </STinputbox>

      <Footer />
    </>
  );
};

const STloginTxt = styled.h2`
  margin: 10vh auto 0 auto;
  font-size: 30px;
  font-weight: bold;
  font-family: 'Futura';
`;
const STinputbox = styled.div`
  background-color: white;
  width: 400px;
  height: 550px;
  margin: 3vh auto 13vh auto;
  padding: 50px;
`;
const Img = styled.img`
  width: 180px;
  border-radius: 90px 90px 0px 0px;
`;
const LoginInputSection = styled.div`
  margin: 5vh auto;
`;
const LoginInput = styled.input`
  width: 180px;
  padding: 7px;
  margin-bottom: 10px;
  background-color: #c9e6ff;
  border-style: none;
  font-size: 18px;
  font-family: 'Ageo Personal Use';
`;
const SignupA = styled.a`
  margin-left: 10vw;
  font-size: 15px;
  font-family: 'Ageo Personal Use';
  cursor: pointer;
`;
const LoginBtn = styled.button`
  padding: 7px 40px;
  border-style: none;
  border-radius: 30px;
  margin-top: 20px;
  font-family: 'Ageo Personal Use';
  background-color: #072541;
  color: white;
  cursor: pointer;
`;
const SocialLoginBtn = styled.div`
  width: 180px;
  margin: 5vh auto 0 auto;
  display: grid;
  grid-template-columns: 90px 90px;
  grid-template-rows: 1fr;
`;

export default Login;
