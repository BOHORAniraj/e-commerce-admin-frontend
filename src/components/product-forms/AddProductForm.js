import { useEffect } from "react";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Button, Spinner, Alert } from "react-bootstrap";
import { fetchCat } from "../../pages/category/categoryAction";
import { addProductAction } from "../../pages/product/productAction";
import { ProductCategoryList } from "../product-category-list/ProductCategoryList";

const initialState = {
	status: false,
	title: "",
	price: 0,
	salePrice: 0,
	saleStartDate: "",
	saleEndData: "",
	brand: "",
	qty: 0,
	description: "",
};

export const AddProductForm = () => {
	const dispatch = useDispatch();
	const [product, setProduct] = useState(initialState);

	const [selectedCats, setSelectedCats] = useState([]);
	const [images, setImages] = useState([]);

	const { isPending, productResponse } = useSelector(state => state.product);

	useEffect(() => {
		dispatch(fetchCat());
	}, [dispatch]);

	const handleOnChange = e => {
		const { checked, name, value } = e.target;

		if (name === "status") {
			setProduct({
				...product,
				status: checked,
			});

			return;
		}

		if (name === "category") {
			console.log(value);
			setProduct({
				...product,
				category: [value],
			});

			return;
		}

		setProduct({
			...product,
			[name]: value,
		});
	};

	const handleOnImageSelect = e => {
		const { files } = e.target;

		setImages(files);
	};

	const handleOnSubmit = e => {
		e.preventDefault();

		// combine the form data and the image as multipart of form

		const formData = new FormData();

		for (const key in product) {
			// console.log(key, product[key]);
			formData.append(key, product[key]);
		}
		//add category list as well
		formData.append("categories", selectedCats);

		images.length && [...images].map(img => formData.append("images", img));

		dispatch(addProductAction(formData));

		window.scrollTo(0, 0);
	};

	const handleOnCatSelect = e => {
		const { checked, value } = e.target;

		if (checked) {
			// add on the list
			setSelectedCats([...selectedCats, value]);
		} else {
			// remove from teh state list
			const args = selectedCats.filter(catId => catId !== value);
			setSelectedCats(args);
		}
	};

	console.log(selectedCats);
	return (
		<div>
			{isPending && <Spinner variant="primary" animation="border" />}
			{productResponse?.message && (
				<Alert
					variant={productResponse?.status === "success" ? "success" : "danger"}
				>
					{productResponse?.message}
				</Alert>
			)}
			<Form onSubmit={handleOnSubmit}>
				<Form.Group className="mb-3">
					<Form.Check
						name="status"
						type="switch"
						id="custom-switch"
						label="Status"
						onChange={handleOnChange}
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Title * </Form.Label>
					<Form.Control
						name="title"
						placeholder="product name"
						onChange={handleOnChange}
						required
					/>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label>Price * </Form.Label>
					<Form.Control
						name="price"
						type="number"
						placeholder="50"
						onChange={handleOnChange}
						required
					/>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label> * Qty </Form.Label>
					<Form.Control
						name="qty"
						type="number"
						onChange={handleOnChange}
						required
					/>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label> Select categories </Form.Label>
					<ProductCategoryList handleOnCatSelect={handleOnCatSelect} />
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label> Sale Price </Form.Label>
					<Form.Control
						name="salePrice"
						type="number"
						placeholder="40"
						onChange={handleOnChange}
					/>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label> Sale starts date </Form.Label>
					<Form.Control
						name="saleStartDate"
						type="date"
						onChange={handleOnChange}
					/>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label> Sale end date </Form.Label>
					<Form.Control
						name="saleEndData"
						type="date"
						onChange={handleOnChange}
					/>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label> Brand</Form.Label>
					<Form.Control
						name="brand"
						placeholder="Nike"
						onChange={handleOnChange}
					/>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label> Description * </Form.Label>
					<Form.Control
						as="textarea"
						name="description"
						style={{ height: "200px" }}
						onChange={handleOnChange}
						required
					/>
				</Form.Group>
				{/* image uploader */}
				<Form.Group className="mb-3">
					<Form.Label> Upload Images </Form.Label>
					<Form.Control
						name="images"
						type="file"
						onChange={handleOnImageSelect}
						multiple
						accept="image/*"
					/>
					{/* <input type="file" name="" id="" /> */}
				</Form.Group>
				<Button variant="primary" type="submit">
					Add Product
				</Button>
			</Form>
		</div>
	);
};
