import React from "react";
import { LinkContainer } from "react-router-bootstrap";

import { Container, Nav, Navbar } from "react-bootstrap";

export const Header = () => {
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
							<Nav.Link>Log Out</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</div>
	);
};
