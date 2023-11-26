// React와 필요한 hook들을 불러옵니다.
import React, { useState, useEffect } from 'react';
// react-router-dom에서 페이지 이동 및 파라미터를 가져오는 hook을 불러옵니다.
import { useParams, useNavigate } from 'react-router-dom';
// Firebase 설정과 Firestore에서 필요한 함수들을 불러옵니다.
import { db, arrayUnion } from '../firebase';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { increment } from 'firebase/firestore';
import Header from '../components/Home/Header';
import { IoMdHome } from 'react-icons/io';
import styled from 'styled-components';

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
      <Header />
      <IoMdHome onClick={handleGoHome} style={{ fontSize: '40px', marginTop: '10vh' }} />
      <ThanksDetailPage>
        <UserDetail>
          <h2>{post.nickname}</h2>
          <p>작성 시간: {post.createdAt}</p>
          <p>기분: {post.mood}</p>
        </UserDetail>

        {post.content && (
          <ThanksList>
            <p>1 {post.content.oneThank}</p>
            <p>2 {post.content.twoThank}</p>
            <p>3 {post.content.threeThank}</p>
            <p>4 {post.content.fourThank}</p>
            <p>5 {post.content.fiveThank}</p>
          </ThanksList>
        )}
        <ViewnLike>
          <p>{post.views} views</p>
          &nbsp; &nbsp; &nbsp; &nbsp;
          <p>{post.likes} likes</p>
        </ViewnLike>

        <CommentDiv>
          <h3>comments</h3>
          <br />
          <form onSubmit={handleComment}>
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="댓글을 입력하세요."
            />
            <button type="submit">submit</button>
          </form>
          <br />
          {comments.map((comment, i) => (
            <div key={i}>
              <p>작성자: {comment.userId}</p>
              <p>작성 시간: {comment.createdAt}</p>
              <p>{comment.text}</p>
            </div>
          ))}
        </CommentDiv>
      </ThanksDetailPage>
    </div>
  );
};

const ThanksDetailPage = styled.div`
  width: 80%;
  margin: 10vh auto;
  padding: 50px;
  border-radius: 180px 180px 0 0;
  background-color: white;
`;
const ThanksList = styled.div`
  padding: 50px;
  line-height: 30px;
`;
const UserDetail = styled.div`
  width: 400px;
  padding: 20px;
  margin: 0 auto;
  line-height: 20px;
  border-bottom: 1px solid #d9d9d9;
`;
const ViewnLike = styled.div`
  padding-bottom: 50px;
  display: flex;
  color: #707070;
  margin-left: 600px;
  margin-bottom: -30px;
`;
const CommentDiv = styled.div`
  width: 90%;
  margin: 0 auto;
  padding: 50px;
  border-top: 1px solid #659bcf;
`;

export default Detail;
