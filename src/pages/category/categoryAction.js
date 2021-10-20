import {
	catRequestPending,
	catRespSuccess,
	fetchCatRespSuccess,
	catRequestFail,
} from "./categorySlice";
import {
	createCategory,
	fetchCategory,
	deleteCategory,
	updateCategory,
} from "../../api/categoryApi";
import { updateNewAccessJWT } from "../../api/tokenAPI";

import { userLogOut } from "../admin-auth-slice/userAction";

export const createCat = newCat => async dispatch => {
	dispatch(catRequestPending());

	// call the api
	const data = await createCategory(newCat);

	if (data?.message === "jwt expired") {
		//request for new accessJWT
		const token = await updateNewAccessJWT();

		if (token) {
			return dispatch(createCat(newCat));
		} else {
			dispatch(userLogOut());
		}
	}

	if (data?.status === "success") {
		dispatch(fetchCat());
		return dispatch(catRespSuccess(data));
	}

	dispatch(catRequestFail(data));
};

export const fetchCat = () => async dispatch => {
	dispatch(catRequestPending());

	const { status, message, categories } = await fetchCategory();

	// auto re-auth
	if (message === "jwt expired") {
		//request for new accessJWT
		const token = await updateNewAccessJWT();

		if (token) {
			return dispatch(fetchCat());
		} else {
			dispatch(userLogOut());
		}
	}
	//end auto re-auth

	if (status === "success") {
		return dispatch(fetchCatRespSuccess(categories));
	}

	dispatch(catRequestFail({ status, message }));
};

export const deleteCat = _id => async dispatch => {
	dispatch(catRequestPending());

	const data = await deleteCategory(_id);

	if (data?.message === "jwt expired") {
		//request for new accessJWT
		const token = await updateNewAccessJWT();

		if (token) {
			return dispatch(deleteCat(_id));
		} else {
			dispatch(userLogOut());
		}
	}

	if (data.status === "success") {
		dispatch(fetchCat());
		return dispatch(catRespSuccess(data));
	}

	dispatch(catRequestFail(data));
};

export const updateCat = catObj => async dispatch => {
	dispatch(catRequestPending());

	const data = await updateCategory(catObj);

	if (data?.message === "jwt expired") {
		//request for new accessJWT
		const token = await updateNewAccessJWT();

		if (token) {
			return dispatch(updateCat(catObj));
		} else {
			dispatch(userLogOut());
		}
	}

	if (data.status === "success") {
		dispatch(fetchCat());
		return dispatch(catRespSuccess(data));
	}

	dispatch(catRequestFail(data));
};
