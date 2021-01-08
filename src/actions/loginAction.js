import axios from 'axios';
import { logout } from './logoutAction';

export const login = (user_info) => ({
	type: 'INITIALIZE_USER_INFO',
	user_info,
});

export const setError = (message, name) => {
	return ({
	type: 'LOGIN_ERROR',
	error_res: {message, name},
})};

export const startLogin = (payload) => {
	return (dispatch) => {
		return axios({
			method: 'post',
			url: `${process.env.REACT_APP_PORT_NUMBER}api/login`,
			data: {
				email: payload.email,
				password: payload.password,
			},
		}).then((res) => {
			const {token, userType, name, email, phoneNumber} = res.data.success;

			if (token && userType && name && email) {
				localStorage.setItem('token', token);
				axios.defaults.headers.common['Authorization'] = 'Bearer '+token;
				dispatch(login({userType, name, email, phoneNumber}));
			} else {
				console.log('error');
			}
            return res.status;
		}).catch((error) => {
			if(error.response) dispatch(setError("Wrong email or password", "emailPassword"));
		});
	};
};

export const getAuthenticatedUser = () => {
	return (dispatch) => {
		axios({
			method: 'get',
			url: `${process.env.REACT_APP_PORT_NUMBER}api/me`,
		}).then((res) => {
			const {userType, name, email, phoneNumber} = res.data.data;

			if (userType && name && email) {
				dispatch(login({userType, name, email, phoneNumber}));
			} else {
				dispatch(logout());
				console.log('error');
			}
            return res.status;
		}).catch((error) => {
			if(error.response) 
				if( error.response.status === 401)
					dispatch(logout());
		});
	};
};
