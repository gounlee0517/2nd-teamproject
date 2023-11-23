import { useEffect, useState } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, GoogoleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Home/Header';
import Footer from '../components/Home/Footer';
import styled from 'styled-components';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
  };

  const signIn = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log(userCredential);
      alert('로그인에 성공하셨습니다');
      navigate('/');
    } catch (error) {
      console.log(error);
      alert('로그인에 실패하셨습니다');
    }
  };
  // function signInGoogle() {
  //   const provider = new GoogoleAuthProvider()
  //   signInWithPopup(auth, provider)
  //     .then((data) => {
  //       setUserData(data.user);
  //       console.log(data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }

  return (
    <>
      <Header />

      <div>
        <STloginTxt>Thanks diary</STloginTxt>
        <STinputbox>
          <h3>로그인</h3>
          <br />
          <div>
            <label>이메일</label>
            <br />
            <input type="email" value={email} name="email" onChange={onChange} required></input>
          </div>
          <div>
            <label>비밀번호</label>
            <br />
            <input type="password" value={password} name="password" onChange={onChange} required></input>
          </div>
          <a
            onClick={() => {
              navigate('/signup');
            }}
          >
            회원가입
          </a>
          <br />
          <button onClick={signIn}>로그인</button>

          <div>
            <button>페이스북 로그인</button>
            <button>구글 로그인</button>
          </div>
        </STinputbox>
      </div>

      <Footer />
    </>
  );
};

const STloginTxt = styled.h2`
  margin: 10vh auto 0 auto;
  font-size: 30px;
`
const STinputbox = styled.div`
  background-color: pink;
  width: 600px;
  height: 400px;
  margin: 3vh auto 15vh auto;
  padding: 50px;
`;

export default Login;
