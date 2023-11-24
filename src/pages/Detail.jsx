// Detail.jsx
// React와 필요한 hook들을 불러옵니다.
import React, { useState, useEffect } from 'react';
// react-router-dom에서 페이지 이동 및 파라미터를 가져오는 hook을 불러옵니다.
import { useParams, useNavigate } from 'react-router-dom';
// Firebase 설정과 Firestore에서 필요한 함수들을 불러옵니다.
import { db, arrayUnion } from '../firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { increment } from 'firebase/firestore';

// Detail 컴포넌트를 정의합니다.
const Detail = () => {
  // state를 정의합니다. post는 게시글을, comment는 댓글을, comments는 댓글 목록을 저장합니다.
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  // URL 파라미터에서 id를 가져옵니다.
  const { id } = useParams();
  // 페이지 이동을 위한 hook을 초기화합니다.
  const navigate = useNavigate();

  // 홈으로 돌아가는 함수입니다.
  const handleGoHome = () => {
    navigate('/');
  };

  // 컴포넌트가 렌더링될 때 게시글을 Firestore에서 불러옵니다.
  useEffect(() => {
    const fetchPost = async () => {
      const docRef = doc(db, 'posts', id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setPost(docSnap.data());
        setComments(docSnap.data().comments);
      } else {
        console.log('No such document!');
      }
    };

    fetchPost();
  }, [id]);

  // 게시글이 아직 불러와지지 않았다면 로딩 메시지를 표시합니다.
  if (!post) return <div>Loading...</div>;

  // 좋아요 버튼을 눌렀을 때 실행되는 함수입니다.
  const handleLike = () => {
    const docRef = doc(db, 'posts', id);
    updateDoc(docRef, {
      likes: increment(1)
    }).then(() => {
      setPost((prevPost) => ({ ...prevPost, likes: prevPost.likes + 1 }));
    });
  };

  // 댓글을 작성할 때 실행되는 함수입니다.
  const handleComment = (e) => {
    e.preventDefault();
    const docRef = doc(db, 'posts', id);
    const newComment = {
      text: comment,
      userId: 'user123',
      createdAt: new Date().toLocaleString()
    };
    updateDoc(docRef, {
      comments: arrayUnion(newComment)
    })
      .then(() => {
        setComments((prevComments) => [newComment, ...prevComments]);
        setComment('');
      })
      .catch((error) => {
        console.error('Error updating document: ', error);
      });
  };

  // 렌더링합니다. 여기서는 게시글 내용, 좋아요 버튼, 댓글 기능 등을 표시합니다.
  return (
    <div>
      <button onClick={handleGoHome}>홈으로 가기</button>
      <h2>{post.nickname}</h2>
      <p>작성자: {post.userId}</p>
      <p>작성 시간: {post.createdAt}</p>
      {post.content && (
        <div>
          <p>{post.content.oneThank}</p>
          <p>{post.content.twoThank}</p>
          <p>{post.content.threeThank}</p>
          <p>{post.content.fourThank}</p>
          <p>{post.content.fiveThank}</p>
        </div>
      )}
      <p>조회수: {post.views}</p>
      <p>좋아요 수: {post.likes}</p>
      <h3>댓글</h3>
      {comments.map((comment, i) => (
        <div key={i}>
          <p>{comment.text}</p>
          <p>작성자: {comment.userId}</p>
          <p>작성 시간: {comment.createdAt}</p>
        </div>
      ))}
      <form onSubmit={handleComment}>
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="댓글을 입력하세요."
        />
        <button type="submit">댓글 달기</button>
      </form>
    </div>
  );
};

export default Detail;
