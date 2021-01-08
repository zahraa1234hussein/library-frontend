import axios from 'axios';

export const getAuthors = async () => {
	const res = await axios({
		method: 'get',
		url: `${process.env.REACT_APP_PORT_NUMBER}api/authors`,
	});
	return res.data.data;
};

export const createAuthor = async (author) => {
	const formData = new FormData()
    formData.append('image', author.image);
	formData.append('name', author.name);
	console.log("author", author);
	const res = await axios({
		method: 'post',
		url: `${process.env.REACT_APP_PORT_NUMBER}api/author`,
		data: formData,
	})
	return res.status;
};

export const updateAuthor = async (author) => {
	const formData = new FormData()
    formData.append('image', author.image);
	formData.append('name', author.name);
	console.log("author", author);
	const res = await axios({
		method: 'post',
		url: `${process.env.REACT_APP_PORT_NUMBER}api/author/${author.id}`,
		data: formData,
	});
	return res.status;
};

export const deleteAuthor = (id) => {
	axios({
		method: 'delete',
		url: `${process.env.REACT_APP_PORT_NUMBER}api/author/${id}`,
	}).then((resp) => {
	});
};
