import { useCallback, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Home/Header';
import Footer from '../components/Home/Footer';
import styled from 'styled-components';

function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState('');
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log('user', user);
    });
  }, []);

  const onChange = (event) => {
    const {
      target: { name, value }
    } = event;
    if (name === 'email') {
      setEmail(value);
    }
    if (name === 'password') {
      setPassword(value);
    }
    if (name === 'passwordConfirm') {
      setPasswordConfirm(value);
    }
  };

  const signUp = (event) => {
    event.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        alert('회원가입이 완료되었습니다');
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
        alert('회원가입을 할 수 없습니다');
      });
  };

  const onChangePasswordConfirm = (e) => {
    const passwordConfirmCurrent = e.target.value;
    setPasswordConfirm(passwordConfirmCurrent);

    if (password === passwordConfirmCurrent) {
      setPasswordConfirmMessage('비밀번호를 똑같이 입력했어요 :)');
      setIsPasswordConfirm(true);
    } else {
      setPasswordConfirmMessage('비밀번호가 달라요. 다시 입력해주세요 !');
      setIsPasswordConfirm(false);
    }
  };
  return (
    <>
      <Header />
      <STSignupTxt>signup</STSignupTxt>
      <STinputbox>
        <Img src='img/night.jpg' />
        <SignupInputSection>
          <SignupInput
            type="email"
            value={email}
            name="email"
            onChange={onChange}
            placeholder="email"
            required
          ></SignupInput>
          <br />
          <SignupInput
            type="password"
            value={password}
            name="password"
            onChange={onChange}
            placeholder="password"
            required
          ></SignupInput>
          <br />
          <SignupInput
            type="password"
            value={passwordConfirm}
            name="passwordConfirm"
            onChange={onChange}
            placeholder="password confirm"
            required
          ></SignupInput>
          <br />
          <SignupBtn onClick={signUp}>sign up!</SignupBtn>
        </SignupInputSection>
      </STinputbox>

      <Footer />
    </>
  );
}

const STSignupTxt = styled.h2`
  margin: 10vh auto 0 auto;
  font-size: 30px;
  font-weight: bold;
  font-family: 'Futura';
`;
const STinputbox = styled.div`
  background-color: white;
  width: 400px;
  height: 500px;
  margin: 3vh auto 13vh auto;
  padding: 50px;
`;
const Img = styled.img`
  width: 180px;
  border-radius: 90px 90px 0px 0px;
`;
const SignupInputSection = styled.div`
  margin: 5vh auto;
`;
const SignupInput = styled.input`
  width: 180px;
  padding: 7px;
  margin-bottom: 10px;
  background-color: #c9e6ff;
  border-style: none;
  font-size: 18px;
  font-family: 'Ageo Personal Use';
`;
const SignupBtn = styled.button`
  padding: 7px 40px;
  border-style: none;
  border-radius: 30px;
  margin-top: 20px;
  font-family: 'Ageo Personal Use';
  background-color: #072541;
  color: white;
  cursor: pointer;
`;

export default SignUp;
