// Main.jsx
// React와 필요한 hook들을 불러옵니다.
import React, { useState, useEffect } from 'react';
// react-router-dom에서 페이지 이동을 위한 hook을 불러옵니다.
import { useNavigate } from 'react-router-dom';
// Firebase 설정과 Firestore에서 필요한 함수들을 불러옵니다.
import { db, arrayUnion } from '../../firebase';
import { collection, addDoc, doc, updateDoc, query, orderBy, where } from 'firebase/firestore';
import { increment } from 'firebase/firestore';
import { setDoc } from 'firebase/firestore';
import { getDocs, deleteDoc } from 'firebase/firestore';

// Main 컴포넌트를 정의합니다.
const Main = () => {
  // state를 정의합니다. posts는 게시글을 저장하고, input은 감사 내용을 저장합니다.
  const [posts, setPosts] = useState([]);
  const [input, setInput] = useState({
    oneThank: '',
    twoThank: '',
    threeThank: '',
    fourThank: '',
    fiveThank: ''
  });
  const [searchName, setSearchName] = useState('');
  const [searchNickname, setSearchNickname] = useState('');
  const [filter, setFilter] = useState('latest');

  // 페이지 이동을 위한 hook을 초기화합니다.
  const navigate = useNavigate();

  // 컴포넌트가 렌더링될 때 게시글을 Firestore에서 불러옵니다.
  useEffect(() => {
    const fetchPosts = async () => {
      let orderByField = 'createdAt';
      let orderDirection = 'desc';
      if (filter === 'oldest') {
        orderDirection = 'asc';
      } else if (filter === 'views' || filter === 'likes' || filter === 'comments') {
        orderByField = filter;
      }

      let postQuery = query(collection(db, 'posts'), orderBy(orderByField, orderDirection));
      if (searchName) {
        postQuery = query(postQuery, where('userId', '==', searchName));
      }
      if (searchNickname) {
        postQuery = query(postQuery, where('nickname', '==', searchNickname));
      }

      const postSnapshot = await getDocs(postQuery);
      const postList = postSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setPosts(postList);
    };

    fetchPosts();
  }, [filter, searchName, searchNickname]);

  // input의 변경 사항을 처리하는 함수입니다.
  const handleInput = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value
    });
  };

  // 게시 버튼을 눌렀을 때 실행되는 함수입니다.
  const handleSubmit = () => {
    // input이 모두 채워져 있는지 확인합니다.
    if (!Object.values(input).every((item) => item.trim() !== '')) {
      alert('감사한 사항을 5가지 모두 입력해주세요.');
      return;
    }

    // 새 게시글 객체를 만듭니다.
    const newPost = {
      userId: 'user123',
      nickname: 'nickname123',
      createdAt: new Date().toLocaleString(),
      content: input,
      views: 0,
      likes: 0,
      comments: []
    };

    // Firestore에 새 문서를 추가합니다.
    addDoc(collection(db, 'posts'), newPost)
      .then((docRef) => {
        console.log('Document written with ID: ', docRef.id);
        // Firestore에서 생성한 문서 id를 저장하고 posts state를 업데이트합니다.
        setPosts([...posts, { id: docRef.id, ...newPost }]);
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
      });

    // input을 초기화합니다.
    setInput({
      oneThank: '',
      twoThank: '',
      threeThank: '',
      fourThank: '',
      fiveThank: ''
    });
  };

  // 게시글을 클릭했을 때 조회수를 증가시키고 상세 페이지로 이동하는 함수입니다.
  const handleView = async (postId) => {
    const docRef = doc(db, 'posts', postId);
    await updateDoc(docRef, {
      views: increment(1)
    });
    navigate(`/detail/${postId}`);
  };
  // 좋아요 버튼을 눌렀을 때 좋아요 수를 증가시키는 함수입니다.
  const handleLike = async (event, postId, index) => {
    if (event.currentTarget !== event.target) {
      return;
    }
    const docRef = doc(db, 'posts', postId);
    await updateDoc(docRef, {
      likes: increment(1)
    });

    const newPosts = [...posts];
    newPosts[index].likes += 1;
    setPosts(newPosts);
  };
  // 수정 버튼을 눌렀을 때 상세 페이지로 이동하는 함수입니다.
  const handleEdit = (id) => {
    navigate(`/detail/${id}`);
  };

  // 삭제 버튼을 눌렀을 때 해당 게시글을 삭제하는 함수입니다.
  const handleDelete = async (id) => {
    const docRef = doc(db, 'posts', id);
    await deleteDoc(docRef);
    setPosts(posts.filter((post) => post.id !== id));
  };

  // 렌더링합니다. 여기서는 감사 내용 입력란, 게시글 검색 및 필터링, 게시글 목록을 표시합니다.
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

      <div>게시글 필터링</div>
      <div>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="latest">최신순</option>
          <option value="oldest">오래된순</option>
          <option value="views">조회순</option>
          <option value="likes">좋아요순</option>
          <option value="comments">댓글순</option>
        </select>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
        {posts.map((post, index) => (
          <div key={index} onClick={() => handleView(post.id)} style={{ border: '1px solid black', padding: '10px' }}>
            작성자: {post.userId} / 닉네임: {post.nickname}
            작성 시간: {post.createdAt}
            {post.content &&
              ['oneThank', 'twoThank', 'threeThank', 'fourThank', 'fiveThank'].map((key, i) => (
                <div key={i}>{post.content[key]}</div>
              ))}
            조회수: {post.views}
            좋아요 수: {post.likes}
            <button onClick={(event) => handleLike(event, post.id, index)}>좋아요</button>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Main;
