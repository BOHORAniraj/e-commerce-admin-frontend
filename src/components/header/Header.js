import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch } from "react-redux";
import { userLogOut } from "../../pages/admin-auth-slice/userAction";
import { Container, Nav, Navbar } from "react-bootstrap";

export const Header = () => {
	const dispatch = useDispatch();

	const handleOnLogout = () => {
		dispatch(userLogOut());
	};

	return (
		<div>
			<Navbar collapseOnSelect bg="info" expand="md">
				<Container>
					<LinkContainer to="/dashboard">
						<Navbar.Brand href="#home"> </Navbar.Brand>
					</LinkContainer>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="ms-auto">
							<LinkContainer to="/admin-profile">
								<Nav.Link>
									<i className="fas fa-user"></i>
								</Nav.Link>
							</LinkContainer>

							<Nav.Link onClick={handleOnLogout}>Log Out</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</div>
	);
};
