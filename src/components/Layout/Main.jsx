import React from 'react';
import { useState } from 'react';

const Main = () => {
  const [posts, setPosts] = useState([]);
  const [input, setInput] = useState('');
  const handleInput = (event) => {
    setInput(event.target.value);
  };
  const handleSubmit = () => {
    setPosts([...posts, input]);
    setInput('');
  };
  return (
    <main>
      <div>5감사 설명</div>
      <div>
        <input type="text" value={input} onChange={handleInput} placeholder="5가지 감사한 사항을 입력하세요." />
        <button onClick={handleSubmit}>게시</button>
      </div>
      <div>게시글 검색 </div>
      <div>게시글 필터링</div>
      <div>
        게시글 목록:
        {posts.map((post, index) => (
          <div key={index}>{post}</div>
        ))}
      </div>
    </main>
  );
};

export default Main;
