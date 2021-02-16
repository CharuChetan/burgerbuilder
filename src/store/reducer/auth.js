import * as actionType from '../actions/actionTypes';

const initialState = {
    token: null,
    localId: null,
    error: null,
    loading: false,
    redirectURL: '/'
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.AUTH_START:
            return {
                ...state,
                loading: true
            };
        case actionType.AUTH_SUCCESS:
            return {
                ...state,
                token: action.idToken,
                localId: action.localId,
                loading: false,
                error: null
            }
        case actionType.AUTH_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case actionType.AUTH_LOGOUT:
            return {
                ...state,
                token: null,
                localId: null
            }
        case actionType.SET_AUTH_REDIRECT_URL:
            return {
                ...state,
                redirectURL: action.path
            }
        default:
            return state;
    }
};

export default reducer;