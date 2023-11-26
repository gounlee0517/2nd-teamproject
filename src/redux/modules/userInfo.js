import { getAuth } from '@firebase/auth';
const auth = getAuth();

const SET_USER = 'userInfo/SET_UID';
const EDIT_IMG = 'userInfo/EDIT_IMG';

export const setUser = (payload) => {
  sessionStorage.removeItem('userInfo');
  return { type: SET_USER, payload };
};

export const editIMG = (payload) => {
  return { type: EDIT_IMG, payload };
};

let initialState = sessionStorage.length === 0 ? ' ' : JSON.parse(sessionStorage.getItem('userInfo'));

const userInfo = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      const activeUser = { ...action.payload };
      return activeUser;
    default:
      return state;
  }
};

export default userInfo;
