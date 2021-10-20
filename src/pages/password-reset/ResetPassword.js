import { useSelector } from "react-redux";
import { ForgetPasswordResetForm } from "../../components/forget-password-reset/ForgetPasswordResetForm";

import PasswordResetForm from "../../components/password-reset-form/PasswordResetForm";

const ResetPassPage = () => {
	const { showResetPasswordForm } = useSelector(state => state.user);
	return (
		<div className="register-page mb-5">
			{showResetPasswordForm ? (
				<ForgetPasswordResetForm />
			) : (
				<PasswordResetForm />
			)}
		</div>
	);
};

export default ResetPassPage;
