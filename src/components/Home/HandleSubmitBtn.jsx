// import { addDoc, collection } from 'firebase/firestore';
// import React, { useState } from 'react'
// import { useSelector } from 'react-redux';
// import { db } from '../../firebase';


// function HandleSubmitBtn() {
//     const [mood, setMood] = useState('');
//     const [input, setInput] = useState({
//         oneThank: '',
//         twoThank: '',
//         threeThank: '',
//         fourThank: '',
//         fiveThank: ''
//       });
//     const isLogin = useSelector((state) => state);
//     const handleSubmit = () => {
//       // input이 모두 채워져 있는지 확인합니다.
//       console.log(isLogin.isLogined);
//       if (isLogin.isLogined) {
//         if (!Object.values(input).every((item) => item.trim() !== '')) {
//           alert('감사한 사항을 5가지 모두 입력해주세요.');
//           return;
//         }
//       } else {
//         alert('로그인 후 이용해주세요.');
//         return;
//       }
  
//       // 새 게시글 객체를 만듭니다.
//       const newPost = {
//         userId: 'user123',
//         nickname: 'nickname123',
//         createdAt: new Date().toLocaleString(),
//         content: input,
//         mood: mood, // 이 부분이 추가된 것입니다.
//         views: 0,
//         likes: 0,
//         comments: []
//       };
//       // Firestore에 새 문서를 추가합니다.
//       addDoc(collection(db, 'posts'), newPost)
//         .then((docRef) => {
//           console.log('Document written with ID: ', docRef.id);
//           // Firestore에서 생성한 문서 id를 저장하고 posts state를 업데이트합니다.
//           setPosts([...posts, { id: docRef.id, ...newPost }]);
//         })
//         .catch((error) => {
//           console.error('Error adding document: ', error);
//         });
  
//       // input을 초기화합니다.
//       setInput({
//         oneThank: '',
//         twoThank: '',
//         threeThank: '',
//         fourThank: '',
//         fiveThank: ''
//       });
//       // mood 상태도 초기화합니다.
//       setMood('');
//       setSelectedMood(null);
//     };
//   return (
//     <button onClick={handleSubmit}>게시</button>
//   )
// }

// export default HandleSubmitBtn
