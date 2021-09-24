import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isLoading: false,
	categoryResponse: {},
	show: false,
	selectedCategory: {},
	categories: [],
};
const categorySlice = createSlice({
	name: "category",
	initialState,
	reducers: {
		catRequestPending: state => {
			state.isLoading = true;
		},

		catRespSuccess: (state, { payload }) => {
			state.isLoading = false;
			state.categoryResponse = payload;
		},
		fetchCatRespSuccess: (state, { payload }) => {
			state.isLoading = false;

			state.categories = payload;
		},
		catRespReset: state => {
			state.isLoading = false;
			state.categoryResponse = {};
		},
		onCategorySelect: (state, { payload }) => {
			state.show = !state.show;
			state.selectedCategory = payload || {};
		},
		catRequestFail: (state, { payload }) => {
			state.isLoading = false;
			state.categoryResponse = payload;
		},
	},
});

const { reducer, actions } = categorySlice;

export const {
	catRequestPending,
	catRespSuccess,
	fetchCatRespSuccess,
	catRespReset,
	onCategorySelect,
	catRequestFail,
} = actions;

export default reducer;
