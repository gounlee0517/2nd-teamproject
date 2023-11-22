import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import Detail from '../pages/Detail';
import Mypage from '../pages/Mypage';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mypage/:id" element={<Mypage />} />
        {/*path에서 콜론: 사용하면 path parameter 이름이 됨. 일종의 변수처럼 역할 */}
        {/* <Route path="*" element={<Navigate replace to="/" />} /> */}
        {/* 사전에 정의되지 않은 것이라면 홈으로 리다이렉트 */}
      </Routes>
    </BrowserRouter>
  );
}
