import axios from 'axios';

export const getCategories = async () => {
	const res = await axios({
		method: 'get',
		url: `${process.env.REACT_APP_PORT_NUMBER}api/categories`,
	});
	return res.data.data;
};

export const createCategory = async (category) => {
	console.log("category", category);
	const res = await axios({
		method: 'post',
		url: `${process.env.REACT_APP_PORT_NUMBER}api/category`,
		data: category,
	})
	return res.status;
};

export const updateCategory = async (category) => {
	const res = await axios({
		method: 'put',
		url: `${process.env.REACT_APP_PORT_NUMBER}api/category/${category.id}`,
		data: {
			name: category.name,
		},
	});
	return res.status;
};

export const deleteCategory = (id) => {
	axios({
		method: 'delete',
		url: `${process.env.REACT_APP_PORT_NUMBER}api/category/${id}`,
	}).then((resp) => {
	});
};
