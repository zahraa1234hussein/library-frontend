import axios from 'axios';

export const getSeries = async () => {
	const res = await axios({
		method: 'get',
		url: `${process.env.REACT_APP_PORT_NUMBER}api/series`,
	});
	return res.data.data;
};

export const createSerie = async (serie) => {
	const res = await axios({
		method: 'post',
		url: `${process.env.REACT_APP_PORT_NUMBER}api/serie`,
		data: serie,
	})
	return res.status;
};

export const updateSerie = async (serie) => {
	const res = await axios({
		method: 'put',
		url: `${process.env.REACT_APP_PORT_NUMBER}api/serie/${serie.id}`,
		data: {
			name: serie.name,
		},
	});
	return res.status;
};

export const deleteSerie = (id) => {
	axios({
		method: 'delete',
		url: `${process.env.REACT_APP_PORT_NUMBER}api/serie/${id}`,
	}).then((resp) => {
	});
};
