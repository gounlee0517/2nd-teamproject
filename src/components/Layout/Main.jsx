// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, useParams, useNavigate } from 'react-router-dom';
// import { v4 as uuidv4 } from 'uuid';

// const PostDetail = ({ post }) => {
//   const [comment, setComment] = useState('');
//   const [comments, setComments] = useState([]);
//   const navigate = useNavigate();

//   const handleComment = (e) => {
//     e.preventDefault();
//     setComments([comment, ...comments]);
//     setComment('');
//   };

//   return (
//     <div>
//       <h2>{post.nickname}</h2>
//       <p>작성자: {post.userId}</p>
//       <p>작성 시간: {post.createdAt}</p>
//       {Object.values(post.content).map((item, i) => (
//         <div key={i}>{item}</div>
//       ))}
//       <p>조회수: {post.views}</p>
//       <p>좋아요 수: {post.likes}</p>
//       <h3>댓글</h3>
//       {comments.map((comment, i) => (
//         <p key={i}>{comment}</p>
//       ))}
//       <form onSubmit={handleComment}>
//         <input
//           type="text"
//           value={comment}
//           onChange={(e) => setComment(e.target.value)}
//           placeholder="댓글을 입력하세요."
//         />
//         <button type="submit">댓글 달기</button>
//       </form>
//     </div>
//   );
// };

// const Main = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(true); // 로그인 상태 나타냄
//   const [posts, setPosts] = useState([]); //게시글
//   const [input, setInput] = useState({
//     oneThank: '',
//     twoThank: '',
//     threeThank: '',
//     fourThank: '',
//     fiveThank: ''
//   }); // 5감사
//   const navigate = useNavigate();
//   const handleInput = (event) => {
//     setInput({
//       ...input,
//       [event.target.name]: event.target.value
//     });
//   };
//   //게시하기 버튼 클릭
//   const handleSubmit = () => {
//     if (isLoggedIn && Object.values(input).every((item) => item !== '')) {
//       const newPost = {
//         userId: 'user123',
//         nickname: 'nickname123',
//         createdAt: new Date().toLocaleString(),
//         content: input,
//         views: 0,
//         likes: 0
//       };
//       setPosts([newPost, ...posts]); // 게시글 추가
//       setInput({
//         oneThank: '',
//         twoThank: '',
//         threeThank: '',
//         fourThank: '',
//         fiveThank: ''
//       }); //게시글 초기화
//     } else {
//       alert('로그인이 필요하거나, 감사한 사항을 5가지 모두 입력해주세요.');
//     }
//   };
//   // 게시글 클릭시 조회수 증가 및 상세 페이지로 이동
//   const handleView = (index) => {
//     const newPosts = [...posts];
//     newPosts[index].views += 1;
//     setPosts(newPosts);
//     navigate(`/detail/${index}`); // 해당 post의 상세 페이지로 이동
//   };
//   //좋아요 클릭시 숫자 증가
//   const handleLike = (event, index) => {
//     event.stopPropagation(); // 게시글 좋아요 수 더하기 방지
//     const newPosts = [...posts];
//     newPosts[index].likes += 1;
//     setPosts(newPosts);
//   };

//   return (
//     <main>
//       <div>5감사사 설명</div>
//       <div>
//         <input
//           type="text"
//           name="oneThank"
//           value={input.oneThank}
//           onChange={handleInput}
//           placeholder="첫 번째 감사한 사항을 입력하세요."
//         />
//         <input
//           type="text"
//           name="twoThank"
//           value={input.twoThank}
//           onChange={handleInput}
//           placeholder="두 번째 감사한 사항을 입력하세요."
//         />
//         <input
//           type="text"
//           name="threeThank"
//           value={input.threeThank}
//           onChange={handleInput}
//           placeholder="세 번째 감사한 사항을 입력하세요."
//         />
//         <input
//           type="text"
//           name="fourThank"
//           value={input.fourThank}
//           onChange={handleInput}
//           placeholder="네 번째 감사한 사항을 입력하세요."
//         />
//         <input
//           type="text"
//           name="fiveThank"
//           value={input.fiveThank}
//           onChange={handleInput}
//           placeholder="다섯 번째 감사한 사항을 입력하세요."
//         />
//         <button onClick={handleSubmit}>게시</button>
//       </div>
//       <div>게시글 검색 </div>
//       <div>게시글 필터링</div>
//       <div>
//         {posts.map((post, index) => (
//           <div key={index} onClick={() => handleView(index)}>
//             작성자: {post.userId} / 닉네임: {post.nickname}
//             작성 시간: {post.createdAt}
//             {Object.values(post.content).map((item, i) => (
//               <div key={i}>{item}</div>
//             ))}
//             조회수: {post.views}
//             좋아요 수: {post.likes}
//             <button onClick={(event) => handleLike(event, index)}>좋아요</button>
//           </div>
//         ))}
//       </div>
//     </main>
//   );
// };

// export default Main;
// Main.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, arrayUnion } from '../../firebase';
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore';
import { increment } from 'firebase/firestore';
import { setDoc } from 'firebase/firestore';

const Main = () => {
  const [posts, setPosts] = useState([]); //게시글
  const [input, setInput] = useState({
    oneThank: '',
    twoThank: '',
    threeThank: '',
    fourThank: '',
    fiveThank: ''
  }); // 5감사
  const navigate = useNavigate();

  const handleInput = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = () => {
    if (!Object.values(input).every((item) => item.trim() !== '')) {
      alert('감사한 사항을 5가지 모두 입력해주세요.');
      return;
    }

    const newPost = {
      userId: 'user123',
      nickname: 'nickname123',
      createdAt: new Date().toLocaleString(),
      content: input,
      views: 0,
      likes: 0,
      comments: []
    };

    addDoc(collection(db, 'posts'), newPost)
      .then((docRef) => {
        console.log('Document written with ID: ', docRef.id);
        setPosts([{ id: docRef.id, ...newPost }, ...posts]); // Firestore에서 생성된 ID를 저장
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
      });

    setInput({
      oneThank: '',
      twoThank: '',
      threeThank: '',
      fourThank: '',
      fiveThank: ''
    });
  };

  const handleView = async (index) => {
    const docRef = doc(db, 'posts', posts[index].id); // 저장해 둔 ID를 사용
    await updateDoc(docRef, {
      views: increment(1)
    });
    navigate(`/detail/${index}`);
  };

  //좋아요 클릭시 숫자 증가
  const handleLike = (event, index) => {
    event.stopPropagation(); // 게시글 좋아요 수 더하기 방지
    const newPosts = [...posts];
    newPosts[index].likes += 1;
    setPosts(newPosts);
  };

  return (
    <main>
      <div>5감사사 설명</div>
      <div>
        <input
          type="text"
          name="oneThank"
          value={input.oneThank}
          onChange={handleInput}
          placeholder="첫 번째 감사한 사항을 입력하세요."
        />
        <input
          type="text"
          name="twoThank"
          value={input.twoThank}
          onChange={handleInput}
          placeholder="두 번째 감사한 사항을 입력하세요."
        />
        <input
          type="text"
          name="threeThank"
          value={input.threeThank}
          onChange={handleInput}
          placeholder="세 번째 감사한 사항을 입력하세요."
        />
        <input
          type="text"
          name="fourThank"
          value={input.fourThank}
          onChange={handleInput}
          placeholder="네 번째 감사한 사항을 입력하세요."
        />
        <input
          type="text"
          name="fiveThank"
          value={input.fiveThank}
          onChange={handleInput}
          placeholder="다섯 번째 감사한 사항을 입력하세요."
        />
        <button onClick={handleSubmit}>게시</button>
      </div>
      <div>게시글 검색 </div>
      <div>게시글 필터링</div>
      <div>
        {posts.map((post, index) => (
          <div key={index} onClick={() => handleView(index)}>
            작성자: {post.userId} / 닉네임: {post.nickname}
            작성 시간: {post.createdAt}
            {post.content && Object.values(post.content).map((item, i) => <div key={i}>{item}</div>)}
            조회수: {post.views}
            좋아요 수: {post.likes}
            <button onClick={(event) => handleLike(event, index)}>좋아요</button>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Main;
