import axios from 'axios';

export const getClients = async () => {
	const res = await axios({
		method: 'get',
		url: `${process.env.REACT_APP_PORT_NUMBER}api/clients`,
	});
	return res.data.data;
};

export const updateClient = async (client) => {
	const res = await axios({
		method: 'put',
		url: `${process.env.REACT_APP_PORT_NUMBER}api/client`,
		data: client,
	});
	return res.status;
};

