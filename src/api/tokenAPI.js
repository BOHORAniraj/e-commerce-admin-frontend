import axios from "axios";

const rootUrl =
	process.env.NODE_ENV === "production"
		? process.env.ROOT_URL
		: "http://localhost:8000/api/v1";

const tokenApi = rootUrl + "/token";

export const getNewAccessJWT = async () => {
	try {
		const { data } = await axios.get(tokenApi, {
			headers: {
				Authorization: window.localStorage.getItem("refreshJWT"),
			},
		});

		return data;
	} catch (error) {
		console.log(error);
		return false;
	}
};

export const updateNewAccessJWT = async () => {
	try {
		window.sessionStorage.removeItem("accessJWT");

		const { accessJWT } = await getNewAccessJWT();

		if (accessJWT) {
			window.sessionStorage.setItem("accessJWT", accessJWT);
		}

		return window.sessionStorage.getItem("accessJWT");
	} catch (error) {
		return false;
	}
};

export const requestOtp = async email => {
	try {
		if (!email) {
			return false;
		}

		const { data } = await axios.post(tokenApi + "/request-otp", { email });
		return data;
	} catch (error) {
		return {
			status: "error",
			message: error.message,
		};
	}
};
