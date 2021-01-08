import axios from 'axios';
import moment from 'moment';

export const getBooks = async () => {
	const res = await axios({
		method: 'get',
		url: `${process.env.REACT_APP_PORT_NUMBER}api/books`,
	});
	return res.data.data;
};

export const getBook = async (book_id) => {
	const res = await axios({
		method: 'get',
		url: `book/${book_id}`,
	});
	return res.data.data;
};

export const createBook = async (book) => {
	const formData = new FormData()
    formData.append('image', book.image);
	formData.append('pdf', book.pdf);
	formData.append('publisher_id', book.publisher_id.toString());
	if(book.serie_id) formData.append('serie_id', book.serie_id.toString());
	formData.append('language_id', book.language_id.toString());
	formData.append('title', book.title);
	formData.append('description', book.description);
	formData.append('price', book.price.toString());
	formData.append('chapters', book.chapters.toString());
	formData.append('pages', book.pages.toString());
    formData.append('isProhibited', book.isProhibited? "1" : "0");
	formData.append('publishDate', book.publishDate.toString());
	console.log("book", book);
	const res = await axios({
		method: 'post',
		url: `${process.env.REACT_APP_PORT_NUMBER}api/book`,
		data: formData,
	})
	return res.status;
};

export const updateBook = async (book) => {
	const formData = new FormData()
    formData.append('image', book.image);
	formData.append('pdf', book.pdf);
	formData.append('publisher_id', book.publisher_id.toString());
	if(book.serie_id) formData.append('serie_id', book.serie_id.toString());
	formData.append('language_id', book.language_id.toString());
	formData.append('title', book.title);
	formData.append('description', book.description);
	formData.append('price', book.price.toString());
	formData.append('chapters', book.chapters.toString());
	formData.append('pages', book.pages.toString());
    formData.append('isProhibited', book.isProhibited? "1" : "0");
	formData.append('publishDate', moment(book.publishDate).format("YYYY-MM-DD"));
	for(let x = 0; x < book.authors.length; x++) {
		formData.append('author_ids[]', book.authors[x].id.toString())
	}
	for(let x = 0; x < book.categories.length; x++) {
		formData.append('category_ids[]', book.categories[x].id.toString())
	}
	console.log("book", book);
	const res = await axios({
		method: 'post',
		url: `${process.env.REACT_APP_PORT_NUMBER}api/book/${book.id}`,
		data: formData
	});
	return res.status;
};

export const deleteBook = (id) => {
	axios({
		method: 'delete',
		url: `${process.env.REACT_APP_PORT_NUMBER}api/book/${id}`,
	}).then((resp) => {
	});
};
