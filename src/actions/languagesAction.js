import axios from 'axios';

export const getLanguages = async () => {
	const res = await axios({
		method: 'get',
		url: `${process.env.REACT_APP_PORT_NUMBER}api/languages`,
	});
	return res.data.data;
};

export const createLanguage = async (language) => {
	console.log("language", language);
	const res = await axios({
		method: 'post',
		url: `${process.env.REACT_APP_PORT_NUMBER}api/language`,
		data: language,
	})
	return res.status;
};

export const updateLanguage = async (language) => {
	const res = await axios({
		method: 'put',
		url: `${process.env.REACT_APP_PORT_NUMBER}api/language/${language.id}`,
		data: {
			name: language.name,
		},
	});
	return res.status;
};

export const deleteLanguage = (id) => {
	axios({
		method: 'delete',
		url: `${process.env.REACT_APP_PORT_NUMBER}api/language/${id}`,
	}).then((resp) => {
	});
};
