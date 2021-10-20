import axios from "axios";

const rootUrl =
	process.env.NODE_ENV === "production"
		? process.env.ROOT_URL
		: "http://localhost:8000/api/v1";

const prodApi = rootUrl + "/product";

export const getProduct = async slug => {
	try {
		const urlEndpoint = slug ? `${prodApi}/${slug}` : prodApi;
		const { data } = await axios.get(urlEndpoint, {
			headers: {
				Authorization: window.sessionStorage.getItem("accessJWT"),
			},
		});

		return data;
	} catch (error) {
		console.log(error);
		return error?.response?.data;
	}
};

export const addProduct = async prodObj => {
	try {
		const { data } = await axios.post(prodApi, prodObj, {
			headers: {
				Authorization: window.sessionStorage.getItem("accessJWT"),
			},
		});
		return data;
	} catch (error) {
		console.log(error);
		return error?.response?.data;
	}
};

export const updateProduct = async prodObj => {
	try {
		const { data } = await axios.put(prodApi, prodObj, {
			headers: {
				Authorization: window.sessionStorage.getItem("accessJWT"),
			},
		});
		return data;
	} catch (error) {
		console.log(error);
		return error?.response?.data;
	}
};

export const deleteAProduct = async _id => {
	try {
		const { data } = await axios.delete(prodApi + "/" + _id, {
			headers: {
				Authorization: window.sessionStorage.getItem("accessJWT"),
			},
		});
		return data;
	} catch (error) {
		console.log(error);
		return error?.response?.data;
	}
};
