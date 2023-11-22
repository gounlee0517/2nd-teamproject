import React from 'react';
import { useParams } from 'react-router-dom';

import usersData from '../usersData.json';
import { useSelector } from 'react-redux';
import ThanksBox from '../components/ThanksBox';

function Mypage() {
  const thanks = useSelector((state) => state.thanks);
  //   console.log(thanks);
  const { id } = useParams(); // path parameter 가져오기
  const myThanks = thanks.filter((thanks) => thanks.userID === id); //id에 해당하는 감사일기
  const myData = usersData.filter((user) => user.userID === id)[0];
  console.log(myThanks);
  return (
    <>
      <header>
        <p>감사일기</p>
        <p>메인으로</p>
      </header>
      <main>
        <div>
          <img src={myData.profileImg} alt="profile-image" />
          <p>{myData.name}</p>
        </div>
        {myThanks.map((thank) => (
          <ThanksBox key={thank.postID} thank={thank} />
        ))}
      </main>
    </>
  );
}

export default Mypage;
