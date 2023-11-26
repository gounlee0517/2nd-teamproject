import React, { useRef, useState, useEffect } from 'react';
import { getStorage, ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';
import { getAuth, updateProfile } from '@firebase/auth';
import { editIMG, editName } from '../redux/modules/userInfo';
import { useDispatch } from 'react-redux';
import Header from '../components/Home/Header';
import { useNavigate } from 'react-router';

function SetProfile() {
  const dispatch = useDispatch();
  const storage = getStorage();
  const imageListRef = ref(storage);
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrl, setUrlList] = useState('');
  const [name, setName] = useState('');

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
  };
  const editNameHandler = () => {
    updateProfile(auth.currentUser, {
      displayName: inputName.current.value
    });
    dispatch(editName(inputName.current.value));
  };

  return (
    <>
      <Header />
      <div>
        <input
          type="file"
          onChange={(event) => {
            setImageUpload(event.target.files[0]);
          }}
        />
        <button onClick={upload}>업로드</button>
        <button onClick={editImgHandler}>프로필 이미지 변경하기</button>
        <p>변경할 이름을 입력하세요: </p>

        <input type="text" ref={inputName} />
        <button onClick={editNameHandler}>이름 변경하기</button>
      </div>
    </>
  );
}

export default SetProfile;
