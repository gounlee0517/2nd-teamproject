//마이데이터 부분: 프로필 이미지와 이름 파이어베이스 연결 필요
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { collection, doc, getDocs, query } from 'firebase/firestore';
import { db } from '../firebase';

import usersData from '../usersData.json';
import ThanksBox from '../components/ThanksBox';

function Mypage() {
  const [thankList, setThanks] = useState([]);
  const [rnd, setRnd] = useState('true');
  useEffect(() => {
    const initialState = [];
    const fetchData = async () => {
      //collection 이름이 diarys인 모든 document 가져오기
      const q = query(collection(db, 'diarys'));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        initialState.push({ id: doc.id, ...doc.data() });
      });
      //firestore에서 가져온 데이터 state에 전달
      setThanks(initialState);
    };
    fetchData();
  }, [rnd]);

  const { id } = useParams(); // path parameter 가져오기
  const myThanks = thankList.filter((thanks) => thanks.userID === id); //id에 해당하는 감사일기
  const myData = usersData.filter((user) => user.userID === id)[0];

  console.log('loop');
  const navigate = useNavigate();
  return (
    <>
      <header>
        <p>감사일기</p>
        <div>
          <button onClick={() => navigate('/')}>메인으로</button>
        </div>
      </header>
      <main>
        <div>
          <img src={myData.profileImg} alt="profile-image" />
          <p>{myData.name}</p>
        </div>
        {myThanks.map((thank) => (
          <ThanksBox key={thank.postID} thanks={thank} rnd={rnd} setRnd={setRnd} />
        ))}
      </main>
    </>
  );
}

export default Mypage;
