import React, { useRef, useState } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getAuth, updateProfile } from '@firebase/auth';
import { editIMG, editName } from '../redux/modules/userInfo';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { IoIosCloseCircle } from 'react-icons/io';

function SetProfile({ isOpen, closeModal, myData, setMyData }) {
  // console.log(myData);
  const dispatch = useDispatch();
  const storage = getStorage();
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrl, setUrlList] = useState('');

  const upload = () => {
    if (imageUpload === null) return;

    const imageRef = ref(storage, `images/${imageUpload.name}`);
    // `images === 참조값이름(폴더이름), / 뒤에는 파일이름 어떻게 지을지
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setUrlList(url);
      });
      //
    });
  };

  const auth = getAuth();
  const inputName = useRef(null);

  const editImgHandler = () => {
    updateProfile(auth.currentUser, {
      photoURL: imageUrl
    });
    dispatch(editIMG(imageUrl));
    setMyData({ ...myData, profileImg: imageUrl });
  };

  const editNameHandler = () => {
    const editedName = inputName.current.value;
    updateProfile(auth.currentUser, {
      displayName: editedName
    });
    dispatch(editName(editedName));
    setMyData({ ...myData, nickname: editedName });
  };

  return (
    <>
      <EditModal isOpen={isOpen}>
        <EditTitle>Edit My Profile</EditTitle>
        <div>
          <P>변경할 이미지를 골라주세요 :</P>
          <ButtonDiv>
            <input
              type="file"
              onChange={(event) => {
                setImageUpload(event.target.files[0]);
              }}
            />
            <UploadBtn onClick={upload}>업로드</UploadBtn>
          </ButtonDiv>
          <button onClick={editImgHandler}>프로필 이미지 변경하기</button>
        </div>

        <NameEdit>
          <P>변경할 이름을 입력하세요 :</P>
          <input type="text" ref={inputName} />
          &nbsp;&nbsp;
          <button onClick={editNameHandler}>수정</button>
        </NameEdit>
        <IoIosCloseCircle onClick={closeModal} style={{ fontSize: '30px' }} />
      </EditModal>
    </>
  );
}

const EditTitle = styled.h4`
  width: 210px;
  line-height: 35px;
  font-size: 25px;
  margin: 0 auto 6vh auto;
  border-bottom: 1px solid #659bcf;
`;
const EditModal = styled.div`
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
  margin-top: 30px;
  padding: 35px;
  border-radius: 30px;
  background-color: #c9e6ff;
  line-height: 18px;

  button {
    padding: 5px 15px;
    margin-bottom: 7px;
    border-style: none;
    border-radius: 15px;
    background-color: #659bcf;
    color: white;
    font-family: 'Orbit';
  }
  input {
    border-radius: 15px;
    padding: 5px 30px;
    border-style: none;
  }
`;
const P = styled.p`
  text-align: left;
  margin-left: 40px;
  margin-bottom: 20px;
`;
const ButtonDiv = styled.div`
  margin-top: 15px;
  margin-bottom: 25px;
  display: flex;
`;
const UploadBtn = styled.button`
  margin-right: 20px;
`;
const NameEdit = styled.div`
  margin-top: 30px;
  margin-bottom: 30px;
`;

export default SetProfile;
