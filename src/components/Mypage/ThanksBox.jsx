import React from 'react';
import { useState, useRef } from 'react';

import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import styled from 'styled-components';

import { useNavigate } from 'react-router';

function ThanksBox({ thanks, rnd, setRnd }) {
  const { id, content, comments, createdAt, likes, mood, nickname, userId, views } = thanks;
  console.log(thanks);
  const navigate = useNavigate();

  //수정버튼 눌렀는지 확인
  const [isEditing, setIsEditing] = useState(false);

  const thanks1 = useRef(null);
  const thanks2 = useRef(null);
  const thanks3 = useRef(null);
  const thanks4 = useRef(null);
  const thanks5 = useRef(null);

  const [tnk1, setTnk1] = useState(content.oneThank);
  const [tnk2, setTnk2] = useState(content.twoThank);
  const [tnk3, setTnk3] = useState(content.threeThank);
  const [tnk4, setTnk4] = useState(content.fourThank);
  const [tnk5, setTnk5] = useState(content.fiveThank);
  // console.log(tnk1);

  //삭제버튼 핸들러
  const deleteThanks = async (event) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      const thanksRef = doc(db, 'posts', id);
      await deleteDoc(thanksRef);
      // window.location.reload();
      rnd ? setRnd(false) : setRnd(true);
    }
  };

  //수정완료 핸들러
  const updateThanks = async (event) => {
    const thanksRef = doc(db, 'posts', id);
    await updateDoc(thanksRef, {
      ...thanks,
      content: [
        thanks1.current.value,
        thanks2.current.value,
        thanks3.current.value,
        thanks4.current.value,
        thanks5.current.value
      ]
    });
  };

  let date = createdAt.split('.');
  return (
    <>
      {isEditing ? (
        <Container>
          <CreatedDate>
            {date[0]}년{date[1]}월{date[2]}일의 감사일기
          </CreatedDate>
          <div>
            <EditThanks>
              <p>감사 1</p>
              <Input
                defaultValue={tnk1}
                type="text"
                ref={thanks1}
                onChange={(event) => {
                  setTnk1(event.target.value);
                }}
              />
            </EditThanks>
            <EditThanks>
              <p>감사 2</p>
              <Input
                defaultValue={tnk2}
                type="text"
                ref={thanks2}
                onChange={(event) => {
                  setTnk2(event.target.value);
                }}
              />
            </EditThanks>
            <EditThanks>
              <p>감사 3</p>
              <Input
                defaultValue={tnk3}
                type="text"
                ref={thanks3}
                onChange={(event) => {
                  setTnk3(event.target.value);
                }}
              />
            </EditThanks>
            <EditThanks>
              <p>감사 4</p>
              <Input
                defaultValue={tnk4}
                type="text"
                ref={thanks4}
                onChange={(event) => {
                  setTnk4(event.target.value);
                }}
              />
            </EditThanks>
            <EditThanks>
              <p>감사 5</p>
              <Input
                defaultValue={tnk5}
                type="text"
                ref={thanks5}
                onChange={(event) => {
                  setTnk5(event.target.value);
                }}
              />
            </EditThanks>
          </div>
          <Div>
            <Button onClick={() => setIsEditing(false)}>취소</Button>
            <Button
              onClick={() => {
                updateThanks();
                setIsEditing(false);
              }}
            >
              수정완료
            </Button>
          </Div>
        </Container>
      ) : (
        <Container>
          <div
            onClick={() => {
              navigate('/detail/' + id);
            }}
          >
            <CreatedDate>
              {date[0]}년{date[1]}월{date[2]}일의 감사일기
            </CreatedDate>
            <ThanksList>
              <Thank>
                <ThankOrder>감사 1</ThankOrder>
                <ThankContent>{tnk1}</ThankContent>
              </Thank>
              <Thank>
                <ThankOrder>감사 2</ThankOrder>
                <ThankContent>{tnk2}</ThankContent>
              </Thank>
              <Thank>
                <ThankOrder>감사 3</ThankOrder>
                <ThankContent>{tnk3}</ThankContent>
              </Thank>
              <Thank>
                <ThankOrder>감사 4</ThankOrder>
                <ThankContent>{tnk4}</ThankContent>
              </Thank>
              <Thank>
                <ThankOrder>감사 5</ThankOrder>
                <ThankContent>{tnk5}</ThankContent>
              </Thank>
            </ThanksList>
          </div>
          <Div>
            <Like>{views} views</Like>
            <Like>{likes} likes</Like>
            <Button onClick={() => setIsEditing(true)}>수정</Button>
            <Button onClick={deleteThanks}>삭제</Button>
          </Div>
        </Container>
      )}
    </>
  );
}

export default ThanksBox;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  /* align-items: center; */

  width: 600px;
  height: 350px;
  margin: 20px auto;
  padding: 20px;

  border: none;
  border-radius: 15px;

  background-color: #f8d1d7;
`;

const CreatedDate = styled.p`
  margin: 10px 25px;
  font-size: 20px;
`;

const EditThanks = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px 30px;
`;

const Input = styled.input`
  /* display: block; */
  height: 25px;
  width: 400px;
  margin: 5px 15px;
  padding: 10px;

  border: none;
  border-radius: 5px;
`;

const Button = styled.button`
  width: 80px;
  padding: 8px;
  margin-left: 10px;

  border: none;
  border-radius: 7px;

  background-color: white;

  &:hover {
    cursor: pointer;
    background-color: lightpink;
  }
`;

const ThanksList = styled.div`
  align-items: center;
  justify-content: center;
  margin: 5px 30px;
`;

const Thank = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 5px 10px;
`;

const ThankOrder = styled.p`
  width: 60px;
`;

const ThankContent = styled.p`
  background-color: white;
  height: 25px;
  width: 480px;
  margin: 5px 10px;

  border: none;
  border-radius: 5px;
  padding-left: 10px;
  padding-top: 2px;
`;

const Div = styled.div`
  display: flex;
  align-items: right;
  justify-content: right;

  margin-top: 15px;
  margin-right: 20px;
`;

const Like = styled.p`
  margin-top: 7px;
  margin-right: 5px;
  margin-left: 10px;
`;
