import React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { deleteThanks } from '../redux/modules/thanks';

function ThanksBox({ thank }) {
  const dispatch = useDispatch();

  //수정버튼 눌렀는지 확인
  const [isEditing, setIsEditing] = useState(false);
  //수정한 내용
  const [editingText, setEditingText] = useState('');

  //삭제버튼 핸들러
  const onDeleteBtn = () => {
    const answer = window.confirm('정말로 삭제하시겠습니까?');
    if (!answer) return;

    dispatch(deleteThanks(thank.postID));
  };

  //수정완료 핸들러
  const onEditDone = () => {
    if (!editingText) return alert('수정사항이 없습니다.');

    // dispatch(editLetter({ id, editingText }));
    setIsEditing(false);
    setEditingText('');
  };

  //   console.log('ThanksBox: ', thank.postID);
  let date = new Date(thank.createdAt).toLocaleDateString('ko', {
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
          <></>
        ) : (
          <>
            <div>
              <p>감사 1: {thank.thank[0]}</p>
              <p>감사 2: {thank.thank[1]}</p>
              <p>감사 3: {thank.thank[2]}</p>
              <p>감사 4: {thank.thank[3]}</p>
              <p>감사 5: {thank.thank[4]}</p>
            </div>

            <p>{thank.like} likes</p>

            <div>
              <button>수정</button>
              <button onClick={onDeleteBtn}>삭제</button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default ThanksBox;
