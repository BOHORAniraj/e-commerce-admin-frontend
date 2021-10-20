import axios from "axios";

const rootUrl =
	process.env.NODE_ENV === "production"
		? process.env.ROOT_URL
		: "http://localhost:8000/api/v1";

const paymentApi = rootUrl + "/payment-option";

export const fetchPaymentOptions = async () => {
	try {
		const { data } = await axios.get(paymentApi, {
			headers: {
				Authorization: window.sessionStorage.getItem("accessJWT"),
			},
		});

		return data;
	} catch (error) {
		console.log(error);
		return error?.response?.data || error.message;
	}
};

export const addPaymentOption = async obj => {
	try {
		const { data } = await axios.post(paymentApi, obj, {
			headers: {
				Authorization: window.sessionStorage.getItem("accessJWT"),
			},
		});
		return data;
	} catch (error) {
		return error.response.data;
	}
};
