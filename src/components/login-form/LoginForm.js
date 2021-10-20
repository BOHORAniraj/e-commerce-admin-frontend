import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Form, Button, Spinner, Alert } from "react-bootstrap";
import { useHistory, useLocation } from "react-router-dom";
import { adminLogin, autoLogin } from "../../pages/admin-auth-slice/userAction";

const initialState = {
	email: "a@a.com",
	password: "1aA!1112",
};
const LoginForm = () => {
	const history = useHistory();
	const location = useLocation();
	const dispatch = useDispatch();

	const { isLoggedIn, isPending, userLoginResp } = useSelector(
		state => state.user
	);

	const [loginInfo, setLoginInfo] = useState(initialState);

	const from = location?.state?.from?.pathname || "/dashboard";

	useEffect(() => {
		!isLoggedIn && dispatch(autoLogin());

		isLoggedIn && history.replace(from);
	}, [isLoggedIn, history, dispatch, from]);

	const handleOnChange = e => {
		const { name, value } = e.target;
		setLoginInfo({
			...loginInfo,
			[name]: value,
		});
	};

	const handleOnSubmit = e => {
		e.preventDefault();

		dispatch(adminLogin(loginInfo));
	};

	return (
		<Card className="p-3 reg-form">
			<h2>Admin Login </h2>
			{isPending && <Spinner variant="primary" animation="border" />}
			{userLoginResp?.message && (
				<Alert
					variant={userLoginResp.status === "success" ? "success" : "danger"}
				>
					{userLoginResp.message}
				</Alert>
			)}
			<hr />
			<Form className="mt-3" onSubmit={handleOnSubmit}>
				<Form.Group className="mb-3">
					<Form.Label>Email</Form.Label>
					<Form.Control
						name="email"
						type="email"
						placeholder="youremail@email.com"
						required
						value={loginInfo.email}
						onChange={handleOnChange}
					/>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label>Password</Form.Label>
					<Form.Control
						name="password"
						type="password"
						placeholder="secret"
						required
						value={loginInfo.password}
						onChange={handleOnChange}
					/>
				</Form.Group>

				<Button type="submit" variant="primary">
					Login
				</Button>
			</Form>
			<div className="mt-3 text-end">
				<a href="/reset-password">Forget Password?</a>
			</div>
		</Card>
	);
};

export default LoginForm;
