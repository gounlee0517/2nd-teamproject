import React from 'react';
import { useParams } from 'react-router-dom';

function Detail() {
  const params = useParams(); // path parameter 가져오기
  console.log(params);
  return <div>Detail</div>;
}

export default Detail;
