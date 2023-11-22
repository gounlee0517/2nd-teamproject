import thanksData from '../../thanksData.json';

//감사일기 삭제
const DELETE_THANKS = 'thanks/DELETE_THANKS';
//감사일기 수정
const EDIT_THANKS = 'thanks/EDIT_THANKS';

export const deleteThanks = (payload) => {
  return { type: DELETE_THANKS, payload };
};

export const editThanks = (payload) => {
  return { type: EDIT_THANKS, payload };
};

const initialState = thanksData;
console.log('thanks.js initialState: ', initialState);

//리듀서
const thanks = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_THANKS:
      const postID = action.payload;
      return state.filter((post) => post.postID !== postID);
    // case EDIT_THANKS:
    //     const { id, editingText } = action.payload;
    //     return state.map(post => {
    //         if (post.postID === id) {
    //             return {...post, }
    //         }
    //     })
    default:
      return state;
  }
};

export default thanks;
