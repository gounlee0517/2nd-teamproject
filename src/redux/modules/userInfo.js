import { getAuth } from '@firebase/auth';
const auth = getAuth();

const SET_USER = 'userInfo/SET_UID';
const EDIT_IMG = 'userInfo/EDIT_IMG';
const EDIT_NAME = 'userInfo/EDIT_NAME';

export const setUser = (payload) => {
  sessionStorage.removeItem('userInfo');
  return { type: SET_USER, payload };
};

export const editIMG = (payload) => {
  return { type: EDIT_IMG, payload };
};

export const editName = (payload) => {
  return { type: EDIT_NAME, payload };
};

let initialState = sessionStorage.length === 0 ? ' ' : JSON.parse(sessionStorage.getItem('userInfo'));

const userInfo = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      const activeUser = { ...action.payload };
      return activeUser;
    case EDIT_IMG:
      console.log(action.payload);
      const tmp1 = JSON.parse(sessionStorage.getItem('userInfo'));
      sessionStorage.setItem('userInfo', JSON.stringify({ ...tmp1, profileImg: action.payload }));
    case EDIT_NAME:
      const tmp2 = JSON.parse(sessionStorage.getItem('userInfo'));
      sessionStorage.setItem('userInfo', JSON.stringify({ ...tmp2, nickname: action.payload }));

    default:
      return state;
  }
};

export default userInfo;
