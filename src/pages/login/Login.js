import React from "react";
import { Card, Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const Login = () => {
	const history = useHistory();

	const handleOnSubmit = () => {
		history.push("/dashboard");
	};

	return (
		<div className="register-page mb-5">
			<Card className="p-3 reg-form">
				<h2>Admin Login </h2>
				<hr />
				<Form className="mt-3" onSubmit={handleOnSubmit}>
					<Form.Group className="mb-3">
						<Form.Label>Email</Form.Label>
						<Form.Control
							name="email"
							type="email"
							placeholder="youremail@email.com"
							// required
						/>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Password</Form.Label>
						<Form.Control
							name="password"
							type="password"
							placeholder="secret"
							// required
						/>
					</Form.Group>

					<Button type="submit" variant="primary">
						Login
					</Button>
				</Form>

				<a href="/registration">Register now</a>
			</Card>
		</div>
	);
};

export default Login;
