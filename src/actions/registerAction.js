import axios from 'axios';

export const setError = (message, name) => {
	return ({
	type: 'REGISTER_ERROR',
	error_res: {message, name},
})};

export const register = (user_info) => ({
	type: 'INITIALIZE_USER_INFO',
	user_info,
});

export const startRegister = (payload, history) => {
	return (dispatch) => {
		return axios({
			method: 'post',
			url: `${process.env.REACT_APP_PORT_NUMBER}api/register`,
			data: {
				name: payload.name,
				email: payload.email,
				password: payload.password,
				c_password: payload.cPassword,
				userType: payload.userType,
				phoneNumber: payload?.phoneNumber,
			},
		}).then((res) => {
			const {token, userType, name, email, phoneNumber} = res.data.success;

			if (token && userType && name && email) {
                localStorage.setItem('token', token);
				axios.defaults.headers.common['Authorization'] = 'Bearer '+token;
				if(userType.localeCompare("CLIENT") === 0)
					dispatch(register({userType, name, email, phoneNumber}));
				
				if(userType.localeCompare("ADMIN") === 0)
					history.push("/login")
								
			} else {
				console.log('error');
            }
            return res.status;
		}).catch((error) => {
			if(error.response) {
				console.log(error.response.data.error)
				if(error.response.data.error.phoneNumber) dispatch(setError(error.response.data.error.phoneNumber[0], "phoneNumber"));
				if(error.response.data.error.c_password) dispatch(setError(error.response.data.error.c_password[0], "c_password"));
				if(error.response.data.error.password) dispatch(setError(error.response.data.error.password[0], "password"));
				if(error.response.data.error.email) dispatch(setError(error.response.data.error.email[0], "email"));
				if(error.response.data.error.name) dispatch(setError(error.response.data.error.name[0], "name"));
			}
		});
	};
};

export const adminApprove = async (payload) => {
	const res = await axios({
		method: 'post',
		url: `${process.env.REACT_APP_PORT_NUMBER}api/admin`,
		data: {
			email: payload.email,
		},
	});
	return res.data;
};
