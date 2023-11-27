//마이데이터 부분: 프로필 이미지와 이름 파이어베이스 연결 필요
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '../firebase';

import styled from 'styled-components';

import usersData from '../usersData.json';
import ThanksBox from '../components/Mypage/ThanksBox';
import Header from '../components/Home/Header';
import { useSelector } from 'react-redux';
import { getAuth } from '@firebase/auth';
import SetProfile from './SetProfile';

function Mypage() {
  const auth = getAuth();
  const { id } = useParams(); // path parameter 가져오기 : userId
  const [thankList, setThanks] = useState([]); //firebase에서 읽어온 정보 state
  const [rnd, setRnd] = useState('true'); //화면 랜더링 state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  //firebase에서 정보 읽어오기, 의존성 배열에 rnd값 들어감
  useEffect(() => {
    const initialState = [];
    const fetchData = async () => {
      //collection 이름이 posts인 모든 document 가져오기
      const q = query(collection(db, 'posts'), where('userId', '==', id), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        initialState.push({ id: doc.id, ...doc.data() });
      });
      //firestore에서 가져온 데이터 state에 전달
      setThanks(initialState);
    };
    fetchData();
  }, [rnd]);
  console.log(thankList);

  const [myData, setMyData] = useState(useSelector((state) => state.setUser));

  // const myData = useSelector((state) => state.setUser);
  console.log(myData);

  return (
    <>
      <Header />
      <ThanksDiary>
        <ProfileBox>
          <ProfileImg src={myData.profileImg} alt="profile" />
          <ProfileName>{myData.nickname}</ProfileName>
          <SetProfile isOpen={isModalOpen} closeModal={closeModal} myData={myData} setMyData={setMyData} />
          <ProfileEdit onClick={openModal} isOpen={isModalOpen}>프로필 변경하기</ProfileEdit>
        </ProfileBox>
        {thankList.map((thank) => (
          <ThanksBox key={thank.id} thanks={thank} rnd={rnd} setRnd={setRnd} />
        ))}
      </ThanksDiary>
    </>
  );
}

export default Mypage;

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
  width: 150px;
  height: 150px;
`;
const ProfileName = styled.p`
  font-size: 32px;
  font-weight: bold;
`;
const ProfileEdit = styled.p`
  display: ${(props) => (props.isOpen ? 'none' : 'block')};
  margin-top: 20px;
  color: #bad7f1;
`
const ThanksDiary = styled.main`
  margin-bottom: 150px;
`;
