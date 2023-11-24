//마이데이터 부분: 프로필 이미지와 이름 파이어베이스 연결 필요
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../firebase';

import styled from 'styled-components';

import usersData from '../usersData.json';
import ThanksBox from '../components/ThanksBox';

function Mypage() {
  const [thankList, setThanks] = useState([]); //firebase에서 읽어온 정보 state
  const [rnd, setRnd] = useState('true'); //화면 랜더링 state

  //firebase에서 정보 읽어오기, 의존성 배열에 rnd값 들어감
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
  //merge 시 auto api 으로 수정
  const myData = usersData.filter((user) => user.userID === id)[0];

  const navigate = useNavigate();
  return (
    <>
      <Header>
        <HomeBtn onClick={() => navigate('/')}>오늘의 감사일기</HomeBtn>
      </Header>
      <ThanksDiary>
        <ProfileBox>
          <ProfileImg src={myData.profileImg} alt="profile" />
          <ProfileName>{myData.name}</ProfileName>
        </ProfileBox>
        {myThanks.map((thank) => (
          <ThanksBox key={thank.postID} thanks={thank} rnd={rnd} setRnd={setRnd} />
        ))}
      </ThanksDiary>
    </>
  );
}

export default Mypage;

const Header = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;

  background-color: pink;
`;

const HomeBtn = styled.button`
  border: none;
  background-color: transparent;
  font-family: 'YClover-Bold';
`;

const ProfileBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 50px;
`;

const ProfileImg = styled.img`
  border-radius: 50%;
  margin-bottom: 20px;
`;

const ProfileName = styled.p`
  font-size: 32px;
  font-weight: bold;
`;

const ThanksDiary = styled.main`
  margin-bottom: 150px;
`;
