import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isPending: false,
	paymentResponse: {}, // { status, message}
	paymentOptions: [], // [{_id, name...}]
};
const paymentSlice = createSlice({
	name: "paymentSlice",
	initialState,
	reducers: {
		paymentRespPending: state => {
			state.isPending = true;
		},
		paymentRespSuccess: (state, { payload = {} }) => {
			state.isPending = false;
			state.paymentResponse = payload;
		},
		getPaymentsRespSuccess: (state, { payload = [] }) => {
			state.isPending = false;
			state.paymentOptions = payload;
		},
		paymentRespError: (state, { payload }) => {
			state.isPending = false;
			state.paymentResponse = payload;
		},
	},
});

const { reducer, actions } = paymentSlice;

export const {
	paymentRespPending,
	paymentRespSuccess,
	paymentRespError,
	getPaymentsRespSuccess,
} = actions;

export default reducer;
