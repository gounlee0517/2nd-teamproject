//로그인 정보 state

//액션 value
const SET_ISLOGINED = 'isLogined/SET_ISLOGINED';
//Action creator
export const setIslogined = (payload) => {
  return {
    type: SET_ISLOGINED,
    payload
  };
};

//초기상태값
const initialState = false;

//리듀서
const isLogined = (state = initialState, action) => {
  switch (action.type) {
    case SET_ISLOGINED:
      console.log(action.payload);
      return action.payload;
    default:
      return state;
  }
};

export default isLogined;
