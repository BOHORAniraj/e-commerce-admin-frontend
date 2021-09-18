import { requestPending, responseSuccess, requestFail } from "./userSlice";
import { createUser, verifyNewUser } from "../../api/userAPI";

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
