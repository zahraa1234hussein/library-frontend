import axios from 'axios';

export const logout = () => ({
	type: 'CLEAR_AUTH_STATE',
});

export const startLogout = () => {    
	return (dispatch, getState) => {
		return axios({
			method: 'post',
			url: `${process.env.REACT_APP_PORT_NUMBER}api/logout`,
		}).then((res) => {

			localStorage.removeItem('token');
			dispatch(logout());

            return res.status;
		}).catch((error) => {if(error.response) return error.response.status;});
	};
};
