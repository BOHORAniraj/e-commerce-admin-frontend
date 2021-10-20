import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	userInfo: {},
	isLoggedIn: false,
	isPending: false,
	userRegisterResponse: {},
	userLoginResp: {},
	userUpdateResp: {},
	isAutoLoginPending: false,
	showResetPasswordForm: false,
	resetPasswordRequestResponse: {},
	passwordResettingEmail: "",
};

const userSlice = createSlice({
	name: "userSlice",
	initialState,
	reducers: {
		requestPending: state => {
			state.isPending = true;
		},

		responseSuccess: (state, { payload }) => {
			state.isPending = false;
			state.userRegisterResponse = payload || {};
		},

		loginSuccess: (state, { payload }) => {
			state.userInfo = payload;
			state.userLoginResp = {};
			state.isLoggedIn = true;
			state.isPending = false;
		},

		profileUpdateSuccess: (state, { payload }) => {
			state.userUpdateResp = payload;
			state.isPending = false;
		},

		passwordUpdateSuccess: (state, { payload }) => {
			state.userUpdateResp = payload;
			state.isPending = false;
		},
		userLogOutSuccess: state => {
			state.userInfo = {};
			state.isLoggedIn = false;
			state.isAutoLoginPending = false;
		},
		loginFail: (state, { payload }) => {
			state.isPending = false;
			state.userLoginResp = payload || {};
		},
		loginAuto: state => {
			state.isLoggedIn = true;
			state.isAutoLoginPending = false;
		},
		autoLoginPending: (state, { payload }) => {
			state.isAutoLoginPending = payload;
		},
		switchLoginResetPassForm: state => {
			state.showResetPasswordForm = !state.showResetPasswordForm;
		},
		restPassResponse: (state, { payload }) => {
			state.isPending = false;
			state.resetPasswordRequestResponse = payload.data;
			state.passwordResettingEmail = payload.email;
			state.showResetPasswordForm = payload.data.status === "success";
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
	loginAuto,
	userLogOutSuccess,
	autoLoginPending,
	profileUpdateSuccess,
	passwordUpdateSuccess,
	switchLoginResetPassForm,
	restPassResponse,
	requestFail,
} = actions;

export default reducer;
