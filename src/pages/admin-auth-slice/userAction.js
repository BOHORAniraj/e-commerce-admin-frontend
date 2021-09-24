import {
	requestPending,
	responseSuccess,
	loginSuccess,
	loginFail,
	requestFail,
} from "./userSlice";
import { createUser, verifyNewUser, loginUser } from "../../api/userAPI";

export const userRegister = newUser => async dispatch => {
	console.log(newUser);
	dispatch(requestPending());

	//call api
	const result = await createUser(newUser);
	console.log(result, "from user action");

	result?.status === "success"
		? dispatch(responseSuccess(result))
		: dispatch(requestFail(result));

	//dispatch response
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
	console.log(result);

	if (result?.status === "success") {
		setJWTinBrowserMemory(result.jwts);
		return dispatch(loginSuccess(result.user));
	}

	dispatch(loginFail(result));
};
