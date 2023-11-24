// Main.jsx
// React와 필요한 hook들을 불러옵니다.
import React, { useState, useEffect } from 'react';
// react-router-dom에서 페이지 이동을 위한 hook을 불러옵니다.
import { useNavigate } from 'react-router-dom';
// Firebase 설정과 Firestore에서 필요한 함수들을 불러옵니다.
import { db } from '../firebase';
import { collection, addDoc, doc, updateDoc, query, orderBy, where } from 'firebase/firestore';
import { increment } from 'firebase/firestore';
import { getDocs, deleteDoc } from 'firebase/firestore';

import Header from '../components/Home/Header';
import Footer from '../components/Home/Footer';
import { useSelector } from 'react-redux';
import { getAuth } from 'firebase/auth';

// Main 컴포넌트를 정의합니다.
const Main = () => {
  //로그인 유저 정보 가져오기
  const auth = getAuth();
  const user = auth.currentUser;

  // 기분을 저장하는 state를 추가합니다.
  const [mood, setMood] = useState('');
  const [selectedMood, setSelectedMood] = useState(null);
  const moodEmojis = {
    '기분 좋음': '(❁´◡`❁)',
    '우울하거나 슬픔': '(T_T)',
    '그냥 쏘쏘': '(⊙_⊙;)',
    '최고의 하루를 보냈어': '(☞ﾟヮﾟ)☞╰(*°▽°*)╯☜(ﾟヮﾟ☜)'
  };

  const handleMood = (value) => {
    if (selectedMood === value) {
      setSelectedMood(null);
    } else {
      setSelectedMood(value);
      setMood(moodEmojis[value]);
    }
  };

  // state를 정의합니다. posts는 게시글을 저장하고, input은 감사 내용을 저장합니다.
  const [posts, setPosts] = useState([]);
  const [input, setInput] = useState({
    oneThank: '',
    twoThank: '',
    threeThank: '',
    fourThank: '',
    fiveThank: ''
  });
  // 새 게시글 객체에 mood 필드를 추가합니다.
  const newPost = {
    userId: 'user.uid',
    nickname: 'user.displayName',
    createdAt: new Date().toLocaleString(),
    content: input,
    mood: mood,
    views: 0,
    likes: 0,
    comments: []
  };
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
      console.log(postList);
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
  const isLogin = useSelector((state) => state);
  const handleSubmit = () => {
    // input이 모두 채워져 있는지 확인합니다.
    console.log(isLogin.isLogined);
    if (isLogin.isLogined) {
      if (!Object.values(input).every((item) => item.trim() !== '')) {
        alert('감사한 사항을 5가지 모두 입력해주세요.');
        return;
      }
    } else {
      alert('로그인 후 이용해주세요.');
      return;
    }

    // 새 게시글 객체를 만듭니다.
    const newPost = {
      userId: 'user123',
      nickname: 'nickname123',
      createdAt: new Date().toLocaleString(),
      content: input,
      mood: mood, // 이 부분이 추가된 것입니다.
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
    // mood 상태도 초기화합니다.
    setMood('');
    setSelectedMood(null);
  };

  // 게시글을 클릭했을 때 조회수를 증가시키고 상세 페이지로 이동하는 함수입니다.
  const handleView = async (postId) => {
    const docRef = doc(db, 'posts', postId);
    await updateDoc(docRef, {
      views: increment(1)
    });
    navigate('/detail/' + postId);
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

  // 렌더링합니다. 여기서는 감사 내용 입력란, 게시글 검색 및 필터링, 게시글 목록을 표시합니다.
  return (
    <>
      <Header />
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
        </div>
        <div>오늘의 기분</div>
        <div>
          <p onClick={() => handleMood('기분 좋음')}>
            {selectedMood === '기분 좋음' ? moodEmojis['기분 좋음'] : '기분 좋음'}
          </p>
          <p onClick={() => handleMood('우울하거나 슬픔')}>
            {selectedMood === '우울하거나 슬픔' ? moodEmojis['우울하거나 슬픔'] : '우울하거나 슬픔'}
          </p>
          <p onClick={() => handleMood('그냥 쏘쏘')}>
            {selectedMood === '그냥 쏘쏘' ? moodEmojis['그냥 쏘쏘'] : '그냥 쏘쏘'}
          </p>
          <p onClick={() => handleMood('최고의 하루를 보냈어')}>
            {selectedMood === '최고의 하루를 보냈어' ? moodEmojis['최고의 하루를 보냈어'] : '최고의 하루를 보냈어'}
          </p>
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
            <div key={index} style={{ border: '1px solid black', padding: '10px' }}>
              <div onClick={() => handleView(post.id)}>
                작성자: {post.userId} / 닉네임: {post.nickname}
                작성 시간: {post.createdAt}
                기분: {post.mood}
                {post.content &&
                  ['oneThank', 'twoThank', 'threeThank', 'fourThank', 'fiveThank'].map((key, i) => (
                    <div key={i}>{post.content[key]}</div>
                  ))}
              </div>
              조회수: {post.views}
              좋아요 수: {post.likes}
              <button onClick={(event) => handleLike(event, post.id, index)}>좋아요</button>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Main;
