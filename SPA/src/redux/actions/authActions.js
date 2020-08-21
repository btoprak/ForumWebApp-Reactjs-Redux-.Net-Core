import axios from 'axios'
import { setAuthToken } from '../../utility/setAuthToken'
import { LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT, REGISTER_SUCCESS, REGISTER_ERROR, LOGIN_START } from './actionTypes'
import { returnErrors } from './errorActions';
import jwtDecode from 'jwt-decode';

export const loginStart = () => {
    return { type: LOGIN_START };
};

export const loginSuccess = (token, user) => {
    //alertify.success("giriş yapıldı");
    return { type: LOGIN_SUCCESS, token: token, user: user };
};

export const loginError = () => {
    return { type: LOGIN_ERROR };
};

export const logout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("userInfo");
    return { type: LOGOUT };
}

export const registerSuccess = user => {
    return { type: REGISTER_SUCCESS, payload: user };
};

export const registerError = () => {
    return { type: REGISTER_ERROR };
};

// REGISTER
export const registerUser = (history, userData) => dispatch => {
    axios.post('http://localhost:58152/api/auth/register', userData)
        .then(res => {
            console.log(userData)
            history.push("/login");
            dispatch(registerSuccess(userData))
        })
        .catch(err => {
            console.log(err.response);
            dispatch(returnErrors(err.response.data[0].description, err.response.status, 'REGISTER_FAIL'));
            dispatch(registerError());
        })
}

// LOGIN
export const loginUser = (history, userData) => dispatch => {
    // dispatch(loginStart());
    axios.post('http://localhost:58152/api/auth/login', userData)
        .then(res => {
            const { token } = res.data
            const userInfo = res.data.user;
            // Token'i localStorage'da saklıyoruz
            localStorage.setItem('userInfo', JSON.stringify(userInfo));
            localStorage.setItem('jwtToken', token)
            setAuthToken(token);
            history.push("/");
            dispatch(loginSuccess(token, userInfo));
        })
        .catch(err => {
            //console.log(err.response.data);
            dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
            dispatch(loginError());
        });
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('jwtToken');

        if (localStorage.getItem('jwtToken')) {

            var user = jwtDecode(localStorage.getItem('jwtToken'));
            // console.log(user.exp * 1000);
            var diff = Date.now() - user.iat * 1000;
            var minutes = Math.floor(diff / 1000 / 60);
            console.log(minutes);
            if (minutes > 60) {
                localStorage.clear();
                dispatch(logout());
            }
            else {
                const user = JSON.parse(localStorage.getItem('userInfo'));
                setAuthToken(token);
                dispatch(loginSuccess(token, user));
            }
        }
    };
};


