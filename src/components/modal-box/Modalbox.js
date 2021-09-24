import React from "react";
import { Modal, Button } from "react-bootstrap";

export const ModalBox = ({ title, children, show, onHide }) => {
	return (
		<div>
			<Modal
				show={show}
				size="lg"
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
				</Modal.Header>
				<Modal.Body>{children}</Modal.Body>
				<Modal.Footer>
					<Button onClick={onHide}>Close</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};
