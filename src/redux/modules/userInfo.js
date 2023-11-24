const SET_UID ="userInfo/SET_UID";
// const SET_NICKNAME ="userInfo/SET_NICKNAME";
// const SET_IMG ="userInfo/SET_IMG";

export const setUid= (payload) => {
    return {type: SET_UID, payload};
}
// export const setNickname = (payload) => {
//     return {type: SET_NICKNAME, payload};
// }
// export const setImg = (payload) => {
//     return {type: SET_IMG, payload};
// }

const initialState ='';

const userInfo = (state=initialState, action) => {
    switch (action.type) {
        case SET_UID:
            const activeUid = action.payload;
            return activeUid;
        // case SET_NICKNAME:
        //     const activeNickname = action.payload;
        //     return activeNickname; 
        // case SET_IMG:
        //     const activeImg = action.payload;
        //     return activeImg; 
        default:
            return state;
    }
}

export default userInfo;