import { useState } from "react";
import { Alert, Card, Form, ListGroup, Spinner, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { resetPasswordAction } from "../../pages/admin-auth-slice/userAction";

const initialPassword = {
	otp: "",
	password: "1aA#1111",
	confirmPassword: "1aA#1111",
};

const passErrorInitial = {
	isMatched: false,
	isLengthy: false,
	hasLowerCase: false,
	hasUpperCase: false,
	hasNumber: false,
	hasSpecialChar: false,
};

export const ForgetPasswordResetForm = () => {
	const dispatch = useDispatch();

	const [updatePass, setUpdatePass] = useState(initialPassword);
	const [passError, setPassError] = useState(passErrorInitial);

	const { isPending, resetPasswordRequestResponse, passwordResettingEmail } =
		useSelector(state => state.user);

	const handleOnSubmit = e => {
		e.preventDefault();
		const { otp, password } = updatePass;

		const passObj = {
			otp,
			email: passwordResettingEmail,
			password,
		};
		dispatch(resetPasswordAction(passObj));
	};

	const handleOnChange = e => {
		const { name, value } = e.target;

		let isMatched = false;
		if (name === "password") {
			setPassError({
				...passError,
				isMatched: updatePass.confirmPassword === value,
			});
		}

		if (name === "confirmPassword") {
			isMatched = updatePass.password === value;
			const isLengthy = value.length >= 8;
			const hasLowerCase = /[a-z]/.test(value);
			const hasUpperCase = /[A-Z]/.test(value);
			const hasNumber = /[0-9]/.test(value);
			const hasSpecialChar = /[!, @, # ,$, %, ^, &, *, ( , ), _]/.test(value);

			setPassError({
				...passError,
				isMatched,
				isLengthy,
				hasLowerCase,
				hasUpperCase,
				hasNumber,
				hasSpecialChar,
			});
		}

		setUpdatePass({
			...updatePass,
			[name]: value,
		});
	};

	return (
		<Card className="p-3 reg-form">
			<h3 className="text-center py-2">Reset password</h3>
			<hr />
			<div>
				{isPending && <Spinner variant="primary" animation="border" />}

				{resetPasswordRequestResponse?.message && (
					<Alert
						variant={
							resetPasswordRequestResponse?.status === "success"
								? "success"
								: "danger"
						}
					>
						{resetPasswordRequestResponse?.message}
					</Alert>
				)}
				<Form onSubmit={handleOnSubmit}>
					<Form.Group className="mb-3">
						<Form.Label>OTP *</Form.Label>
						<Form.Control
							name="otp"
							onChange={handleOnChange}
							minLength="6"
							value={updatePass.otp}
							placeholder="enter otp"
							required
						/>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>New Password *</Form.Label>
						<Form.Control
							name="password"
							type="password"
							onChange={handleOnChange}
							value={updatePass.password}
							minLength="8"
							maxLength="25"
							placeholder="new password"
							required
						/>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Confirm Password *</Form.Label>
						<Form.Control
							name="confirmPassword"
							type="password"
							minLength="8"
							maxLength="25"
							onChange={handleOnChange}
							value={updatePass.confirmPassword}
							placeholder="confirm password"
							required
						/>
					</Form.Group>

					<ListGroup>
						<ListGroup.Item
							variant={passError.isMatched ? "success" : "danger"}
						>
							Password doesn't match
						</ListGroup.Item>
						<ListGroup.Item
							variant={passError.isLengthy ? "success" : "danger"}
						>
							must be at least 8 character
						</ListGroup.Item>
						<ListGroup.Item
							variant={passError.hasNumber ? "success" : "danger"}
						>
							must include a number
						</ListGroup.Item>
						<ListGroup.Item
							variant={passError.hasUpperCase ? "success" : "danger"}
						>
							must include uppercase
						</ListGroup.Item>
						<ListGroup.Item
							variant={passError.hasLowerCase ? "success" : "danger"}
						>
							must include lowercase
						</ListGroup.Item>
						<ListGroup.Item
							variant={passError.hasSpecialChar ? "success" : "danger"}
						>
							must include on of the following special character i.e. ! @ # $ %
							^ & * () _
						</ListGroup.Item>
					</ListGroup>
					<div className="d-grid gap-2 mt-3">
						<Button
							variant="warning"
							type="submit"
							size="lg"
							disabled={Object.values(passError).includes(false)}
						>
							Reset Password
						</Button>
					</div>
				</Form>
			</div>
			<div className="mt-3 text-end">
				<a href="/">Login Now</a>
			</div>
		</Card>
	);
};

