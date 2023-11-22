import { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

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

  // const signUp = (event) => {
  //   event.preventDefault();
  //   createUserWithEmailAndPassword(auth, email, password)
  //   .then((userCredential) => {
  //     console.log(userCredential);
  //     alert('회원가입이 완료되었습니다');
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //     alert('회원가입을 할 수 없습니다');
  //   })
  // };
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

  return (
    <div className="App">
      <h2>로그인</h2>
      <form>
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
        {/* <button onClick={signUp}>회원가입</button> */}
        <a
          onClick={() => {
            navigate('/signup');
          }}
        >
          회원가입
        </a>
        <br />
        <button onClick={signIn}>로그인</button>
        {/* <button onClick={logOut}>로그아웃</button> */}

        <div>
          <button>페이스북 로그인</button>
          <button>구글 로그인</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
