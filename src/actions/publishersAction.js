import axios from 'axios';

export const getPublishers = async () => {
	const res = await axios({
		method: 'get',
		url: `${process.env.REACT_APP_PORT_NUMBER}api/publishers`,
	});
	return res.data.data;
};

export const createPublisher = async (publisher) => {
	const res = await axios({
		method: 'post',
		url: `${process.env.REACT_APP_PORT_NUMBER}api/publisher`,
		data: publisher,
	})
	return res.status;
};

export const updatePublisher = async (publisher) => {
	const res = await axios({
		method: 'put',
		url: `${process.env.REACT_APP_PORT_NUMBER}api/publisher/${publisher.id}`,
		data: {
			name: publisher.name,
		},
	});
	return res.status;
};

export const deletePublisher = (id) => {
	axios({
		method: 'delete',
		url: `${process.env.REACT_APP_PORT_NUMBER}api/publisher/${id}`,
	}).then((resp) => {
	});
};
