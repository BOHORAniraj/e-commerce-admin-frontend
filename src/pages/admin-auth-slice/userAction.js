import {
	requestPending,
	responseSuccess,
	loginSuccess,
	loginAuto,
	userLogOutSuccess,
	autoLoginPending,
	profileUpdateSuccess,
	passwordUpdateSuccess,
	restPassResponse,
	loginFail,
	requestFail,
} from "./userSlice";
import {
	createUser,
	verifyNewUser,
	loginUser,
	logoutUser,
	updateUserProfile,
	updateUserPassword,
	resetForgetPassword,
	getUser,
} from "../../api/userAPI";
import {
	getNewAccessJWT,
	updateNewAccessJWT,
	requestOtp,
} from "../../api/tokenAPI";

export const userRegister = newUser => async dispatch => {
	dispatch(requestPending());

	const result = await createUser(newUser);

	result?.status === "success"
		? dispatch(responseSuccess(result))
		: dispatch(requestFail(result));
};

export const userEmailVerification = usrObj => async dispatch => {
	dispatch(requestPending());

	//call api
	const result = await verifyNewUser(usrObj);

	result?.status === "success"
		? dispatch(responseSuccess(result))
		: dispatch(requestFail(result));

	//dispatch response
};

const setJWTinBrowserMemory = ({ accessJWT, refreshJWT }) => {
	window.sessionStorage.setItem("accessJWT", accessJWT);
	window.localStorage.setItem("refreshJWT", refreshJWT);
};

export const adminLogin = loginInfo => async dispatch => {
	dispatch(requestPending());

	//call api to login
	const result = await loginUser(loginInfo);

	if (result?.status === "success") {
		setJWTinBrowserMemory(result.jwts);
		return dispatch(loginSuccess(result.user));
	}

	dispatch(loginFail(result));
};

export const autoLogin = () => async dispatch => {
	dispatch(autoLoginPending(true));
	const accessJWT = window.sessionStorage.getItem("accessJWT");
	const refreshJWT = window.localStorage.getItem("refreshJWT");
	//1.accessJWT exist
	if (accessJWT) {
		return dispatch(loginAuto());
	}

	//2. accessJWT do not exist but refreshJWT exist
	if (!accessJWT && refreshJWT) {
		//call api to get refreshJWT token
		const result = await getNewAccessJWT();
		if (result?.accessJWT) {
			window.sessionStorage.setItem("accessJWT", result.accessJWT);
			return dispatch(loginAuto());
		}

		dispatch(userLogOut());
	}
};

export const userLogOut = () => async dispatch => {
	const accessJWT = window.sessionStorage.getItem("accessJWT");
	const refreshJWT = window.localStorage.getItem("refreshJWT");

	await logoutUser({ accessJWT, refreshJWT });

	window.sessionStorage.removeItem("accessJWT");
	window.localStorage.removeItem("refreshJWT");
	dispatch(userLogOutSuccess());
};

export const fetchUser = () => async dispatch => {
	dispatch(requestPending());
	const data = await getUser();

	if (data?.message === "jwt expired") {
		//request for new accessJWT
		const token = await updateNewAccessJWT();

		if (token) {
			return dispatch(fetchUser());
		} else {
			dispatch(userLogOut());
		}
	}

	if (data?.user) {
		return dispatch(loginSuccess(data.user));
	}
	dispatch(requestFail(data));
};

export const updateProfileUser = userInfo => async dispatch => {
	dispatch(requestPending());
	const data = await updateUserProfile(userInfo);

	if (data?.message === "jwt expired") {
		//request for new accessJWT
		const token = await updateNewAccessJWT();

		if (token) {
			return dispatch(updateProfileUser(userInfo));
		} else {
			dispatch(userLogOut());
		}
	}

	dispatch(profileUpdateSuccess(data));
};

export const updatePasswordUser = passInfo => async dispatch => {
	dispatch(requestPending());
	const data = await updateUserPassword(passInfo);

	if (data?.message === "jwt expired") {
		//request for new accessJWT
		const token = await updateNewAccessJWT();

		if (token) {
			return dispatch(updatePasswordUser(passInfo));
		} else {
			dispatch(userLogOut());
		}
	}

	dispatch(passwordUpdateSuccess(data));
};

export const requestPassResetOtp = email => async dispatch => {
	dispatch(requestPending());
	const data = await requestOtp(email);

	dispatch(restPassResponse({ data, email }));
};

export const resetPasswordAction = passObj => async dispatch => {
	dispatch(requestPending());
	const data = await resetForgetPassword(passObj);

	dispatch(restPassResponse({ data }));
};
