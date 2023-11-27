import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, addDoc, doc, updateDoc, query, orderBy } from 'firebase/firestore';
import { increment } from 'firebase/firestore';
import { getDocs } from 'firebase/firestore';
import styled from 'styled-components';

import Header from '../components/Home/Header';
import Footer from '../components/Home/Footer';
import { useSelector } from 'react-redux';
import { getAuth } from 'firebase/auth';

const Main = () => {
  // 기분을 저장하는 state를 추가합니다.
  const [mood, setMood] = useState('');
  const [selectedMood, setSelectedMood] = useState(null);
  const moodEmojis = {
    HAPPY: '🥰',
    GLOOMY: '😥',
    FINE: '🙂',
    SOSO: '🤨'
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

  const [filter, setFilter] = useState('latest');
  const [pagernd, setPagernd] = useState(false);

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

      const postSnapshot = await getDocs(postQuery);
      const postList = postSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      console.log(postList);
      setPosts(postList);
    };

    fetchPosts();
  }, [filter, pagernd]);

  // input의 변경 사항을 처리하는 함수입니다.
  const handleInput = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value
    });
  };

  // 게시 버튼을 눌렀을 때 실행되는 함수입니다.
  const isLogin = useSelector((state) => state);
  console.log(isLogin.isLogined);
  const handleSubmit = () => {
    // input이 모두 채워져 있는지 확인합니다.
    console.log(isLogin.isLogined);
    if (isLogin.isLogined) {
      if (!Object.values(input).every((item) => item.trim() !== '')) {
        alert('감사한 사항을 5가지 모두 입력해주세요.');
        return;
      }
      if (getAuth().currentUser.displayName === null) {
        alert('My page에서 이름을 설정한 후 이용해 주세요.');
        return;
      }
    } else {
      alert('로그인 후 이용해주세요.');
      return;
    }

    // 새 게시글 객체를 만듭니다.
    const auth = getAuth().currentUser;
    const newPost = {
      userId: auth.uid,
      nickname: auth.displayName,
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
    pagernd ? setPagernd(false) : setPagernd(true);
    // console.log(pagernd);
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
      <Mainpage>
        <InputSection>
          <TitleSection>
            <H1>THANKS DIARY</H1>
            <br />
            <H4>what are you grateful for today?</H4>
          </TitleSection>

          <InputDiv>
            <MoodSection>
              <MoodDiv>
                <P onClick={() => handleMood('HAPPY')}>{selectedMood === 'HAPPY' ? moodEmojis['HAPPY'] : 'HAPPY'}</P>
                &nbsp; &nbsp;
                <P onClick={() => handleMood('GLOOMY')}>
                  {selectedMood === 'GLOOMY' ? moodEmojis['GLOOMY'] : 'GLOOMY'}
                </P>
                &nbsp; &nbsp;
                <P onClick={() => handleMood('FINE')}>{selectedMood === 'FINE' ? moodEmojis['FINE'] : 'FINE'}</P>
                &nbsp; &nbsp;
                <P onClick={() => handleMood('SOSO')}>{selectedMood === 'SOSO' ? moodEmojis['SOSO'] : 'SOSO'}</P>
              </MoodDiv>
            </MoodSection>
            <Input
              type="text"
              name="oneThank"
              value={input.oneThank}
              onChange={handleInput}
              placeholder="첫 번째 감사한 사항을 입력하세요."
            />
            <Input
              type="text"
              name="twoThank"
              value={input.twoThank}
              onChange={handleInput}
              placeholder="두 번째 감사한 사항을 입력하세요."
            />
            <Input
              type="text"
              name="threeThank"
              value={input.threeThank}
              onChange={handleInput}
              placeholder="세 번째 감사한 사항을 입력하세요."
            />
            <Input
              type="text"
              name="fourThank"
              value={input.fourThank}
              onChange={handleInput}
              placeholder="네 번째 감사한 사항을 입력하세요."
            />
            <Input
              type="text"
              name="fiveThank"
              value={input.fiveThank}
              onChange={handleInput}
              placeholder="다섯 번째 감사한 사항을 입력하세요."
            />
            <Button onClick={handleSubmit}>POST</Button>
          </InputDiv>
        </InputSection>

        <ThanksSection>
          <ThanksQuote>
            "What makes the derest beautiful is
            <br />
            that it hides a well somewhere."
          </ThanksQuote>
          <Select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="latest">최신순</option>
            <option value="oldest">오래된순</option>
            <option value="views">조회순</option>
            <option value="likes">좋아요순</option>
            <option value="comments">댓글순</option>
          </Select>

          <ThanksList style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px' }}>
            {posts.map((post, index) => (
              <AThanksList key={index} style={{ backgroundColor: '#c9e6ff', padding: '10px' }}>
                <div onClick={() => handleView(post.id)}>
                  <ThanksListTime>{post.createdAt}</ThanksListTime>
                  <ThanksListUser>
                    <p>{post.nickname}</p> &nbsp;
                    <br />
                    <p>{post.mood}</p>
                  </ThanksListUser>
                  <FiveThanksList>
                    {post.content &&
                      ['oneThank', 'twoThank', 'threeThank', 'fourThank', 'fiveThank'].map((key, i) => (
                        <Thank key={i}>{post.content[key]}</Thank>
                      ))}
                  </FiveThanksList>
                </div>
                <Viewnlike>
                  <p>{post.views} views</p> &nbsp;&nbsp;
                  <p>{post.likes} likes</p>
                </Viewnlike>
                <LikeBtn onClick={(event) => handleLike(event, post.id, index)}>♥</LikeBtn>
              </AThanksList>
            ))}
          </ThanksList>
        </ThanksSection>
      </Mainpage>
      <Footer />
    </>
  );
};

const Mainpage = styled.main`
  width: 80%;
  height: 100%;
  margin: 0 auto;
`;
const InputSection = styled.div`
  background-color: #659bcf;
  height: 500px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
`;
const MoodSection = styled.div`
  &:button {
    margin-top: 20px;
  }
`;
const TitleSection = styled.div`
  margin-left: 15vw;
  margin-top: -2vh;
`;
const H1 = styled.h1`
  font-size: 60px;
  display: flex;
  margin-top: 23vh;
`;
const H4 = styled.h4`
  font-size: 25px;
  display: flex;
`;
const InputDiv = styled.div`
  margin: 5vh auto 0 auto;
  width: 350px;
  display: flex;
  flex-direction: column;
`;
const Input = styled.input`
  padding: 10px;
  margin-top: 10px;
  border-style: none;
  border-radius: 7px;
  text-align: center;
`;
const MoodDiv = styled.div`
  margin: 5vh auto 0 auto;
  display: flex;
  cursor: pointer;
`;
const P = styled.p`
  width: 80px;
  font-size: 18px;
  font-family: 'Ageo Personal Use';
  transition: all 0.5s;
  &:hover {
    text-shadow: 2px 2px 2px white;
  }
`;
const Button = styled.button`
  width: 150px;
  padding: 10px;
  margin: 4vh auto 0 auto;
  border-style: none;
  border-radius: 30px;
  background-color: #072541;
  color: white;
  transition: all 0.5s;

  &:hover {
    background-color: white;
    color: #072541;
    cursor: pointer;
  }
`;
const ThanksSection = styled.div`
  background-color: white;
  border-radius: 130px 130px 0px 0px;
  padding-bottom: 10vh;
`;
const ThanksQuote = styled.h4`
  transform: translateY(10vh);
  font-size: 30px;
  font-family: 'Intrepid';
  color: #659bcf;
  font-weight: bold;
  text-shadow: 2px 2px 4px #c9e6ff;
`;
const Select = styled.select`
  transform: translateX(-33vw) translateY(18vh);
  padding: 5px;
  border-style: none;
  background-color: #659bcf;
  color: white;
  border-radius: 15px;
`;
const ThanksList = styled.div`
  margin: 20vh auto 0 auto;
  width: 90%;

  &:hover {
    cursor: pointer;
  }
`;
const AThanksList = styled.div`
  transition: all 0.3s;
  &:hover {
    transform: scale(1.1);
    box-shadow: 1px 1px 20px #ddd;
  }
`;
const ThanksListTime = styled.p`
  font-size: 11px;
  color: #707070;
  text-align: right;
`;
const ThanksListUser = styled.div`
  width: 80%;
  margin: 0 auto;
  font-size: 14px;
  line-height: 10px;
  padding: 15px;
  border-bottom: 1px solid white;
`;
const FiveThanksList = styled.div`
  text-align: left;
  padding: 20px;
  line-height: 18px;
`;

const Thank = styled.p`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;

  margin-bottom: 10px;
`;

const LikeBtn = styled.button`
  padding: 2px 15px;
  border-style: none;
  border-radius: 30px;
  font-size: 18px;
  background-color: #ff6f74;
  color: white;
`;
const Viewnlike = styled.div`
  display: flex;
  justify-content: center;

  font-size: 12px;
  margin: 0 auto 15px auto;
  color: #707070;
`;

export default Main;
