import axios from "axios";

const rootUrl =
	process.env.NODE_ENV === "production"
		? process.env.ROOT_URL
		: "http://localhost:8000/api/v1";

const catApi = rootUrl + "/category";

export const createCategory = async newCat => {
	try {
		const { data } = await axios.post(catApi, newCat, {
			headers: {
				authorization: window.sessionStorage.getItem("accessJWT"),
			},
		});
		return data;
	} catch (error) {
		return error?.response?.data;
	}
};

export const fetchCategory = async () => {
	try {
		const { data } = await axios.get(catApi, {
			headers: {
				authorization: window.sessionStorage.getItem("accessJWT"),
			},
		});
		return data;
	} catch (error) {
		return error?.response?.data;
	}
};

export const deleteCategory = async _id => {
	try {
		const { data } = await axios.delete(`${catApi}/${_id}`, {
			headers: {
				authorization: window.sessionStorage.getItem("accessJWT"),
			},
		});
		return data;
	} catch (error) {
		return error?.response?.data;
	}
};

export const updateCategory = async catObj => {
	try {
		const { data } = await axios.patch(catApi, catObj, {
			headers: {
				authorization: window.sessionStorage.getItem("accessJWT"),
			},
		});
		return data;
	} catch (error) {
		return error?.response?.data;
	}
};
