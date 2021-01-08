import axios from 'axios';
import moment from 'moment';


export const getBookClient = async (book_id) => {
	const res = await axios({
		method: 'get',
		url: `${process.env.REACT_APP_PORT_NUMBER}api/bookClient/${book_id}`,
    });
	return res.data.data;
};

export const getOrder = async (book_id) => {
	const res = await axios({
		method: 'get',
		url: `${process.env.REACT_APP_PORT_NUMBER}api/order/${book_id}`,
    });
	return res.data.data;
};

export const createBookClient = async (bookId) => {
	const resp = await axios({
		method: 'post',
		url: `${process.env.REACT_APP_PORT_NUMBER}api/bookClient`,
        responseType: 'blob',
		data: {
			book_id: bookId,
		},
    });
    const url = window.URL.createObjectURL(new Blob([resp.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'file.pdf');
    document.body.appendChild(link);
    link.click();
    return resp.status;
};


export const createBookClientWithPayment = async (bookId, paymentInfo) => {
	const resp = await axios({
		method: 'post',
		url: `${process.env.REACT_APP_PORT_NUMBER}api/bookClient`,
        responseType: 'blob',
		data: {
            book_id: bookId,
            cardNumber: paymentInfo.cardNumber,
            cardCvv: paymentInfo.cardCvv,
            cardExDate: moment(paymentInfo.cardExDate).format("YYYY-MM-DD"),
            nameOnCard: paymentInfo.nameOnCard
		},
    });
    const url = window.URL.createObjectURL(new Blob([resp.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'file.pdf');
    document.body.appendChild(link);
    link.click();
    return resp.status;
};
