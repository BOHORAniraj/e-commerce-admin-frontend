import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	userInfo: {},
	isLoggedIn: false,
	isPending: false,
	userRegisterResponse: {},
	userLoginResp: {},
};

const userSlice = createSlice({
	name: "userSlice",
	initialState,
	reducers: {
		requestPending: state => {
			state.isPending = true;
		},

		responseSuccess: (state, { payload }) => {
			console.log(payload, "from slice");
			state.isPending = false;
			state.userRegisterResponse = payload || {};
		},

		loginSuccess: (state, { payload }) => {
			state.userInfo = payload;
			state.userLoginResp = {};
			state.isLoggedIn = true;
			state.isPending = false;
		},

		loginFail: (state, { payload }) => {
			state.isPending = false;
			state.userLoginResp = payload || {};
		},

		requestFail: (state, { payload }) => {
			state.isPending = false;
			state.userRegisterResponse = payload || {};
		},
	},
});

const { reducer, actions } = userSlice;

export const {
	requestPending,
	responseSuccess,
	loginSuccess,
	loginFail,
	requestFail,
} = actions;

export default reducer;
