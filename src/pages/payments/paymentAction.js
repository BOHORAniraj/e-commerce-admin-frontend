import {
	paymentRespPending,
	paymentRespSuccess,
	paymentRespError,
	getPaymentsRespSuccess,
} from "./paymentSlice";

import { addPaymentOption, fetchPaymentOptions } from "../../api/paymentApi";
import { updateNewAccessJWT } from "../../api/tokenAPI";
import { userLogOut } from "../admin-auth-slice/userAction";

export const addNewPaymentOption = obj => async dispatch => {
	dispatch(paymentRespPending());

	//call api to send data
	const data = await addPaymentOption(obj);

	//re aut
	if (data?.message === "jwt expired") {
		const token = await updateNewAccessJWT();

		if (token) {
			return dispatch(addNewPaymentOption(obj));
		} else {
			dispatch(userLogOut());
		}
	}
	//end re auth

	if (data?.status === "success") {
		dispatch(paymentRespSuccess(data));
		return;
	}

	dispatch(paymentRespError(data));
};

export const getPaymentOptions = () => async dispatch => {
	dispatch(paymentRespPending());

	//call api to send data
	const data = await fetchPaymentOptions();

	//re aut
	if (data?.message === "jwt expired") {
		const token = await updateNewAccessJWT();

		if (token) {
			return dispatch(getPaymentOptions());
		} else {
			dispatch(userLogOut());
		}
	}
	//end re auth

	if (data?.status === "success") {
		dispatch(getPaymentsRespSuccess(data.options));
		return;
	}

	dispatch(paymentRespError(data));
};
