import { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setNickname, setImg, setUid } from '../redux/modules/userInfo';
import { getDoc, doc, Firestore } from 'firebase/firestore/lite'

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [profileImg, setProfileImg] = useState('');
  // const activeNickname = useSelector((state) => state.userInfo);
  // const activeImg = useSelector((state) => state.userInfo);
  // const activeUid = useSelector((state) => state.userInfo);
  // const dispatch = useDispatch();
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
    if (name === 'nickname') {
      // dispatch(setNickname(value));
      setNickname(value);
    }
    if (name === 'profileImg') {
      // dispatch(setImg(event.target.files[0]));
      setProfileImg(value);
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
        <div>
          <label>닉네임</label>
          <br />
          <input
            type="text"
            name="nickname"
            onChange={onChange}
            value={nickname} // 추가
            required
          ></input>
        </div>
        <div>
          <label>프로필 이미지</label>
          <br />
          <input 
            type="file" 
            accept="image/*"
            name="profileImg" 
            onChange={onChange}
            ></input>
        </div>
        <button onClick={signUp}>회원가입</button>
      </form>
    </>
  );
}

export default SignUp;
