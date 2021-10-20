import {
	getProduct,
	addProduct,
	updateProduct,
	deleteAProduct,
} from "../../api/productApi";
import {
	respondPending,
	getProductsSuccess,
	getSingleProductsSuccess,
	addProdSuccess,
	deleteProdSuccess,
	updateProdSuccess,
	respondFail,
} from "./productSlice";
import { updateNewAccessJWT } from "../../api/tokenAPI";
import { userLogOut } from "../admin-auth-slice/userAction";

export const fetchProducts = () => async dispatch => {
	dispatch(respondPending());
	const data = await getProduct();

	// auto re-auth
	if (data.message === "jwt expired") {
		//request for new accessJWT
		const token = await updateNewAccessJWT();

		if (token) {
			return dispatch(fetchProducts());
		} else {
			dispatch(userLogOut());
		}
	}
	//end auto re-auth

	if (data.status === "success") {
		data.products && dispatch(getProductsSuccess(data));
		return;
	}

	dispatch(respondFail(data));
};

export const fetchAProduct = slug => async dispatch => {
	dispatch(respondPending());
	const data = await getProduct(slug);

	// auto re-auth
	if (data?.message === "jwt expired") {
		//request for new accessJWT
		const token = await updateNewAccessJWT();

		if (token) {
			return dispatch(fetchAProduct(slug));
		} else {
			dispatch(userLogOut());
		}
	}
	//end auto re-auth

	if (data.status === "success") {
		data.products && dispatch(getSingleProductsSuccess(data));
		return;
	}

	dispatch(respondFail(data));
};

export const addProductAction = prodObj => async dispatch => {
	dispatch(respondPending());
	const data = await addProduct(prodObj);

	// auto re-auth
	if (data.message === "jwt expired") {
		//request for new accessJWT
		const token = await updateNewAccessJWT();

		if (token) {
			return dispatch(fetchProducts());
		} else {
			dispatch(userLogOut());
		}
	}
	//end auto re-auth

	if (data?.status === "success") {
		dispatch(addProdSuccess(data));
		dispatch(fetchProducts());
		return;
	}

	dispatch(respondFail(data));
};

export const updateProductAction = (prodObj, slug) => async dispatch => {
	dispatch(respondPending());
	const data = await updateProduct(prodObj);

	// auto re-auth
	if (data.message === "jwt expired") {
		//request for new accessJWT
		const token = await updateNewAccessJWT();

		if (token) {
			return dispatch(updateProductAction(prodObj));
		} else {
			dispatch(userLogOut());
		}
	}
	//end auto re-auth

	if (data?.status === "success") {
		dispatch(updateProdSuccess(data));
		dispatch(fetchAProduct(slug));

		return;
	}

	dispatch(respondFail(data));
};

export const deleteProduct = _id => async dispatch => {
	dispatch(respondPending());

	const data = await deleteAProduct(_id);

	// auto re-auth
	if (data.message === "jwt expired") {
		//request for new accessJWT
		const token = await updateNewAccessJWT();

		if (token) {
			return dispatch(deleteProduct(_id));
		} else {
			dispatch(userLogOut());
		}
	}
	//end auto re-auth

	if (data?.status === "success") {
		dispatch(deleteProdSuccess(data));
		dispatch(fetchProducts());
		return;
	}

	dispatch(respondFail(data));
};
