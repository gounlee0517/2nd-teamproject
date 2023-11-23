// Detail.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db, arrayUnion } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const Detail = () => {
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const { id } = useParams();

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

  if (!post) return <div>Loading...</div>;

  const handleComment = (e) => {
    e.preventDefault();
    const docRef = doc(db, 'posts', id);
    const newComment = {
      text: comment,
      userId: 'user123', // 현재 로그인한 사용자의 ID
      createdAt: new Date().toLocaleString() // 현재 시간
    };
    setDoc(docRef, { comments: arrayUnion(newComment) }, { merge: true })
      .then(() => {
        console.log('Document successfully updated!');
        setComments([newComment, ...comments]);
      })
      .catch((error) => {
        console.error('Error updating document: ', error);
      });
    setComment('');
  };

  return (
    <div>
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
