import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminLayout from "../layout/AdminLayout";
import { fetchUser } from "../admin-auth-slice/userAction";
import {
	AdminPasswordResetForm,
	AdminProfileForm,
} from "../../components/admin-profile/AdminProfileForm";

const AdminProfile = () => {
	const dispatch = useDispatch();
	const { userInfo } = useSelector(state => state.user);

	useEffect(() => {
		if (!userInfo._id) {
			dispatch(fetchUser());
		}
	}, [userInfo._id, dispatch]);

	return (
		<div>
			<AdminLayout>
				<h2>Welcome {userInfo.fname}!</h2>
				<hr />

				<AdminProfileForm />
				<hr />
				<h3 className="mt-5">Update password</h3>
				<AdminPasswordResetForm />
			</AdminLayout>
		</div>
	);
};
export default AdminProfile;
