import React, { useState } from "react";
import {
	Form,
	Card,
	InputGroup,
	Button,
	Alert,
	Spinner,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { userRegister } from "../admin-auth-slice/userAction";
import AdminLayout from "../layout/AdminLayout";

const initialState = {
	fname: "",
	lname: "",
	email: "",
	password: "",
	confirmPassword: "",
	phone: "",
	dob: "",
	address: "",
	gender: "",
};
const Register = () => {
	const dispatch = useDispatch();
	const [user, setUser] = useState(initialState);
	const [passwordError, setPasswordError] = useState("");

	const { isPending, userRegisterResponse } = useSelector(state => state.user);

	const handleOnChange = e => {
		const { name, value } = e.target;

		//reset error msg
		passwordError && name === "confirmPassword" && setPasswordError("");
		setUser({
			...user,
			[name]: value,
		});
	};

	const handleOnSubmit = e => {
		e.preventDefault();

		//check for the password confirmation
		const { confirmPassword, ...newUser } = user;
		const { password } = user;

		if (password !== confirmPassword) {
			setPasswordError("Password did not match!");
			return;
		}

		dispatch(userRegister(newUser));
	};

	return (
		<AdminLayout>
			<div className="register-page mb-5">
				<Card className="p-3 reg-form">
					<h2>Register new admin user</h2>
					<hr />
					{isPending && <Spinner variant="primary" animation="border" />}

					{userRegisterResponse?.message && (
						<Alert
							variant={
								userRegisterResponse?.status === "success"
									? "success"
									: "danger"
							}
						>
							{userRegisterResponse?.message}
						</Alert>
					)}

					<Form className="mt-3" onSubmit={handleOnSubmit}>
						<Form.Group className="mb-3">
							<Form.Label>First Name *</Form.Label>
							<Form.Control
								name="fname"
								onChange={handleOnChange}
								placeholder="Sam"
								required
							/>
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>Last Name *</Form.Label>
							<Form.Control
								name="lname"
								onChange={handleOnChange}
								placeholder="Smith"
								required
							/>
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>Email *</Form.Label>
							<Form.Control
								name="email"
								type="email"
								onChange={handleOnChange}
								placeholder="youremail@email.com"
								required
							/>
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>Password *</Form.Label>
							<Form.Control
								name="password"
								type="password"
								onChange={handleOnChange}
								minLength="8"
								placeholder="secret"
								required
							/>
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>Confirm Password *</Form.Label>
							<Form.Control
								name="confirmPassword"
								type="password"
								onChange={handleOnChange}
								required
							/>
							{passwordError && <Alert variant="danger">{passwordError}</Alert>}
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>DOB</Form.Label>
							<Form.Control name="dob" onChange={handleOnChange} type="date" />
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>Phone</Form.Label>
							<Form.Control
								name="phone"
								onChange={handleOnChange}
								placeholder="041xxxxxxx"
							/>
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>Address</Form.Label>
							<Form.Control
								name="address"
								onChange={handleOnChange}
								placeholder="i.e. 3 george st Sydney, nsw, 2000"
							/>
						</Form.Group>

						<Form.Group className="mb-3">
							<Form.Label>Gender</Form.Label>
							<InputGroup>
								<InputGroup.Radio
									name="gender"
									onChange={handleOnChange}
									aria-label="Male"
									defaultValue="male"
								/>
								Male
								<InputGroup.Radio
									name="gender"
									onChange={handleOnChange}
									defaultValue="female"
									aria-label="Female"
									className="ml-3"
								/>
								Female
							</InputGroup>
						</Form.Group>

						<Button type="submit" variant="success">
							Register
						</Button>
					</Form>
				</Card>
			</div>
		</AdminLayout>
	);
};

export default Register;
