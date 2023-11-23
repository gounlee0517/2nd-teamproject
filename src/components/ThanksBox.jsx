import React from 'react';
import { useState, useRef } from 'react';

import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';

function ThanksBox({ thanks, rnd, setRnd }) {
  const navigate = useNavigate();
  const { id, thank, like, userID, createdAt } = thanks;

  //수정버튼 눌렀는지 확인
  const [isEditing, setIsEditing] = useState(false);

  const thanks1 = useRef(null);
  const thanks2 = useRef(null);
  const thanks3 = useRef(null);
  const thanks4 = useRef(null);
  const thanks5 = useRef(null);

  const [tnk1, setTnk1] = useState(thank[0]);
  const [tnk2, setTnk2] = useState(thank[1]);
  const [tnk3, setTnk3] = useState(thank[2]);
  const [tnk4, setTnk4] = useState(thank[3]);
  const [tnk5, setTnk5] = useState(thank[4]);
  // console.log(tnk1);

  //삭제버튼 핸들러
  const deleteThanks = async (event) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      const thanksRef = doc(db, 'diarys', id);
      await deleteDoc(thanksRef);
      // window.location.reload();
      rnd ? setRnd(false) : setRnd(true);
    }
  };

  //수정완료 핸들러
  const updateThanks = async (event) => {
    const thanksRef = doc(db, 'diarys', id);
    await updateDoc(thanksRef, {
      ...thanks,
      thank: [
        thanks1.current.value,
        thanks2.current.value,
        thanks3.current.value,
        thanks4.current.value,
        thanks5.current.value
      ]
    });
  };

  let date = new Date(createdAt).toLocaleDateString('ko', {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  return (
    <>
      <div>
        <p>{date}</p>

        {isEditing ? (
          <>
            <div>
              <input
                defaultValue={thank[0]}
                type="text"
                ref={thanks1}
                onChange={(event) => {
                  setTnk1(event.target.value);
                }}
              />
              <input
                defaultValue={thank[1]}
                type="text"
                ref={thanks2}
                onChange={(event) => {
                  setTnk2(event.target.value);
                }}
              />
              <input
                defaultValue={thank[2]}
                type="text"
                ref={thanks3}
                onChange={(event) => {
                  setTnk3(event.target.value);
                }}
              />
              <input
                defaultValue={thank[3]}
                type="text"
                ref={thanks4}
                onChange={(event) => {
                  setTnk4(event.target.value);
                }}
              />
              <input
                defaultValue={thank[4]}
                type="text"
                ref={thanks5}
                onChange={(event) => {
                  setTnk5(event.target.value);
                }}
              />
            </div>
            <div>
              <button onClick={() => setIsEditing(false)}>취소</button>
              <button
                onClick={() => {
                  updateThanks();
                  setIsEditing(false);
                }}
              >
                수정완료
              </button>
            </div>
          </>
        ) : (
          <>
            <div>
              <p>감사 2: {tnk1}</p>
              <p>감사 2: {tnk2}</p>
              <p>감사 3: {tnk3}</p>
              <p>감사 4: {tnk4}</p>
              <p>감사 5: {tnk5}</p>
            </div>

            <p>{like} likes</p>

            <div>
              <button onClick={() => setIsEditing(true)}>수정</button>
              <button onClick={deleteThanks}>삭제</button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default ThanksBox;
