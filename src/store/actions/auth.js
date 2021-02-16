import * as actionType from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionType.AUTH_START
    }
}

export const authFailed = (err) => {
    return {
        type: actionType.AUTH_FAILED,
        error: err
    }
}

export const authSuccess = (token, id) => {
    return {
        type: actionType.AUTH_SUCCESS,
        idToken: token,
        localId: id
    }
}

export const authLogOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expirationData');
    return {
        type: actionType.AUTH_LOGOUT
    }
}

export const checkExperiation = (expiresIn) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(authLogOut());
        }, expiresIn * 1000)
    }
}

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };

        let url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBjbWVhtrRLUwkKooq_TrSM_aCtIzRTsSY";
        if (!isSignUp) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBjbWVhtrRLUwkKooq_TrSM_aCtIzRTsSY';
        }

        axios.post(url, authData)
            .then(response => {
                const ext_date = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('userId', response.data.localId);
                localStorage.setItem('expirationData', ext_date);
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkExperiation(response.data.expiresIn))
            })
            .catch(err => {
                console.log(err);
                dispatch(authFailed(err.response.data.error.message));
            })
    }
}

export const authRedirectUrl = (path) => {
    return {
        type: actionType.SET_AUTH_REDIRECT_URL,
        path: path
    }
}

export const authStatus = () => {
    return dispatch => {
        const getToken = localStorage.getItem('token');
        if (!getToken) {
            dispatch(authLogOut());
        } else {
            const userId = localStorage.getItem('userId');
            const expireDate = new Date(localStorage.getItem('expirationData'));
            if (expireDate <= new Date()) {
                dispatch(authLogOut());
            } else {
                dispatch(authSuccess(getToken, userId));
                dispatch(checkExperiation((expireDate.getTime() - new Date().getTime()) / 1000));
            }
        }
    }
}