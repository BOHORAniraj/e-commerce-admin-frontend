import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Form, Row, Button, Spinner, Alert } from "react-bootstrap";
import { createCat } from "../../pages/category/categoryAction";

const initialState = {
	name: "",
	parentCat: null,
};
export const CategoryForm = () => {
	const dispatch = useDispatch();
	const [newCat, setNewCat] = useState(initialState);
	const { isLoading, categoryResponse, categories } = useSelector(
		state => state.category
	);

	const handleOnChange = e => {
		const { name, value } = e.target;

		setNewCat({
			...newCat,
			[name]: value,
		});
	};

	const handleOnSubmit = e => {
		e.preventDefault();

		if (!newCat.name) {
			return alert("Please enter the category name");
		}
		console.log(newCat);
		dispatch(createCat(newCat));
	};
	const parentCat = categories.filter(row => !row.parentCat);
	return (
		<div>
			{isLoading && <Spinner variant="primary" animation="border" />}
			{categoryResponse?.message && (
				<Alert
					variant={
						categoryResponse?.status === "success" ? "success" : "danger"
					}
				>
					{categoryResponse?.message}
				</Alert>
			)}

			<Form onSubmit={handleOnSubmit}>
				<Row>
					<Col>
						<Form.Control
							name="name"
							onChange={handleOnChange}
							placeholder="Category name"
						/>
					</Col>
					<Col>
						<Form.Select
							name="parentCat"
							onChange={handleOnChange}
							aria-label="Default select example"
						>
							<option value="">Select Parent Category</option>
							{parentCat?.length &&
								parentCat.map(row => (
									<option key={row._id} value={row._id}>
										{row.name}
									</option>
								))}
						</Form.Select>
					</Col>
					<Col>
						<Button type="submit">Add Category</Button>
					</Col>
				</Row>
			</Form>
		</div>
	);
};
