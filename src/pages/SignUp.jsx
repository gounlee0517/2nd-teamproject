import { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Home/Header';
import Footer from '../components/Home/Footer';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const navigate = useNavigate();

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

  //uid, 닉네임, 프로필 이미지 => 전역 상태로 관리
  return (
    <>
    <Header />
      <h2>회원가입</h2>
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
        <div>
          <label>비밀번호 확인</label>
          <br />
          <input type="password" value={password} name="password" onChange={onChange} required></input>
        </div>

        <button onClick={signUp}>회원가입</button>
      </form>

      <Footer />
    </>
  );
}

export default SignUp;
