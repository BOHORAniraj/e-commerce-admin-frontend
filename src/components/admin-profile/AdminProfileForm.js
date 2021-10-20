import React, { useState, useEffect } from "react";
import {
	Form,
	InputGroup,
	Spinner,
	Button,
	ListGroup,
	Alert,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
	updateProfileUser,
	updatePasswordUser,
} from "../../pages/admin-auth-slice/userAction";

const initialprofileState = {
	fname: "",
	lname: "",
	email: "",
	phone: "",
	dob: "",
	address: "",
	gender: "",
};

///update admin profile
export const AdminProfileForm = () => {
	const dispatch = useDispatch();
	const [adminProfile, setAdminProfile] = useState(initialprofileState);

	const { userInfo, isPending, userUpdateResp } = useSelector(
		state => state.user
	);

	useEffect(() => {
		setAdminProfile(userInfo);
	}, [userInfo]);

	const handleOnSubmit = e => {
		e.preventDefault();

		const { email, phone, address } = adminProfile;

		if (
			userInfo.email !== email ||
			userInfo.phone !== phone ||
			userInfo.address !== address
		) {
			if (window.confirm("Are you sure you want to update the profile info?")) {
				const update = { email, phone, address };
				dispatch(updateProfileUser(update));
			}
			return;
		}
		alert("No information is changed");
	};

	const handleOnChange = e => {
		const { name, value } = e.target;

		setAdminProfile({
			...adminProfile,
			[name]: value,
		});
	};

	return (
		<div className="admin-profile-page  ">
			<hr />
			{isPending && <Spinner variant="primary" animation="border" />}

			{userUpdateResp?.message && (
				<Alert
					variant={userUpdateResp?.status === "success" ? "success" : "danger"}
				>
					{userUpdateResp?.message}
				</Alert>
			)}

			<Form className="mt-3" onSubmit={handleOnSubmit}>
				<Form.Group className="mb-3">
					<Form.Label>First Name *</Form.Label>
					<Form.Control
						name="fname"
						// onChange={handleOnChange}
						placeholder="Sam"
						required
						value={adminProfile.fname}
						disabled
						readOnly
					/>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label>Last Name *</Form.Label>
					<Form.Control
						name="lname"
						// onChange={handleOnChange}
						placeholder="Smith"
						required
						value={adminProfile.lname}
						disabled
						readOnly
					/>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label>
						Email *{" "}
						{adminProfile.isEmailConfirmed ? (
							<i
								title="verified email"
								className="fas fa-check-circle text-success"
							></i>
						) : (
							<i
								title="Email is not verified"
								className="fas fa-times-circle text-danger"
							></i>
						)}
					</Form.Label>
					<Form.Control
						name="email"
						type="email"
						onChange={handleOnChange}
						placeholder="youremail@email.com"
						required
						value={adminProfile.email}
					/>
				</Form.Group>

				<Form.Group className="mb-3">
					<Form.Label>DOB</Form.Label>
					<Form.Control
						name="dob"
						type="date"
						value={adminProfile?.dob?.substr(0, 10)}
						disabled={adminProfile.dob}
					/>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label>Phone</Form.Label>
					<Form.Control
						name="phone"
						onChange={handleOnChange}
						placeholder="041xxxxxxx"
						value={adminProfile.phone}
					/>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label>Address</Form.Label>
					<Form.Control
						name="address"
						onChange={handleOnChange}
						placeholder="i.e. 3 george st Sydney, nsw, 2000"
						value={adminProfile.address}
					/>
				</Form.Group>

				<Form.Group className="mb-3">
					<Form.Label>Gender</Form.Label>
					<InputGroup>
						<InputGroup.Radio
							name="gender"
							onChange={handleOnChange}
							checked={adminProfile.gender === "male"}
							aria-label="Male"
							defaultValue="male"
							disabled
						/>
						Male
						<InputGroup.Radio
							name="gender"
							onChange={handleOnChange}
							checked={adminProfile.gender === "female"}
							defaultValue="female"
							aria-label="Female"
							className="ml-3"
							disabled
						/>
						Female
					</InputGroup>
				</Form.Group>

				<div className="d-grid gap-2">
					<Button type="submit" variant="info" size="lg">
						Update Profile
					</Button>
				</div>
			</Form>
		</div>
	);
};

const initialPassword = {
	currentPassword: "",
	password: "",
	confirmPassword: "",
};

const passErrorInitial = {
	isMatched: false,
	isLengthy: false,
	hasLowerCase: false,
	hasUpperCase: false,
	hasNumber: false,
	hasSpecialChar: false,
};

///update password
export const AdminPasswordResetForm = () => {
	const dispatch = useDispatch();

	const [updatePass, setUpdatePass] = useState(initialPassword);
	const [passError, setPassError] = useState(passErrorInitial);

	const { isPending, userUpdateResp } = useSelector(state => state.user);

	const handleOnSubmit = e => {
		e.preventDefault();
		const { currentPassword, password } = updatePass;

		dispatch(updatePasswordUser({ currentPassword, password }));
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
		<div>
			{isPending && <Spinner variant="primary" animation="border" />}

			{userUpdateResp?.message && (
				<Alert
					variant={userUpdateResp?.status === "success" ? "success" : "danger"}
				>
					{userUpdateResp?.message}
				</Alert>
			)}
			<Form onSubmit={handleOnSubmit}>
				<Form.Group className="mb-3">
					<Form.Label>Current Password *</Form.Label>
					<Form.Control
						name="currentPassword"
						type="password"
						onChange={handleOnChange}
						minLength="8"
						placeholder="enter current password"
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
						maxLength="25"
						placeholder="secret"
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
						required
					/>
				</Form.Group>

				<ListGroup>
					<ListGroup.Item variant={passError.isMatched ? "success" : "danger"}>
						Password doesn't match
					</ListGroup.Item>
					<ListGroup.Item variant={passError.isLengthy ? "success" : "danger"}>
						must be at least 8 character
					</ListGroup.Item>
					<ListGroup.Item variant={passError.hasNumber ? "success" : "danger"}>
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
						must include on of the following special character i.e. ! @ # $ % ^
						& * () _
					</ListGroup.Item>
				</ListGroup>
				<div className="d-grid gap-2 mt-3">
					<Button
						variant="warning"
						type="submit"
						size="lg"
						disabled={Object.values(passError).includes(false)}
					>
						Update Password
					</Button>
				</div>
			</Form>
		</div>
	);
};
