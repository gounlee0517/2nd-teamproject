const SET_ISLOGINED = "isLogin/SET_ISLOGINED";

export const setIsLogined = (payload) => {
    return {type: SET_ISLOGINED, payload};
}

const initialState = false;

const isLogined = (state=initialState, action) => {
    switch (action.type) {
        case SET_ISLOGINED:
            const activeLogin = action.payload;
            return activeLogin;
        default:
            return state;
    }
}

export default isLogined;