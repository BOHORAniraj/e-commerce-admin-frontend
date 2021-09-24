import axios from "axios";

const rootUrl =
	process.env.NODE_ENV === "production"
		? process.env.ROOT_URL
		: "http://localhost:8000/api/v1";

const catApi = rootUrl + "/category";

export const createCategory = async newCat => {
	try {
		const { data } = await axios.post(catApi, newCat);
		return data;
	} catch (error) {
		console.log(error);
		return {
			status: "error",
			message: error.message,
		};
	}
};

export const fetchCategory = async () => {
	try {
		const { data } = await axios.get(catApi);
		return data;
	} catch (error) {
		console.log(error);
		return {
			status: "error",
			message: error.message,
		};
	}
};

export const deleteCategory = async _id => {
	try {
		const { data } = await axios.delete(`${catApi}/${_id}`);
		return data;
	} catch (error) {
		console.log(error);
		return {
			status: "error",
			message: error.message,
		};
	}
};

export const updateCategory = async catObj => {
	try {
		const { data } = await axios.patch(catApi, catObj);
		return data;
	} catch (error) {
		console.log(error);
		return {
			status: "error",
			message: error.message,
		};
	}
};
