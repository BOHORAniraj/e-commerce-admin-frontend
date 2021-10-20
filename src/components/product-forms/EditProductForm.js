import { useEffect } from "react";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Button, Spinner, Alert, InputGroup } from "react-bootstrap";
import { fetchCat } from "../../pages/category/categoryAction";
import { updateProductAction } from "../../pages/product/productAction";
import { resetSingleProductsSuccess } from "../../pages/product/productSlice";
import { useParams } from "react-router-dom";

import { fetchAProduct } from "../../pages/product/productAction";
import { ProductCategoryList } from "../product-category-list/ProductCategoryList";

const initialState = {
	status: false,
	title: "",
	price: 0,
	salePrice: 0,
	saleStartDate: undefined,
	saleEndData: undefined,
	brand: "",
	qty: 0,
	description: "",
};

export const EditProductForm = () => {
	const { slug } = useParams();
	const dispatch = useDispatch();

	const [updateProduct, setUpdateProduct] = useState(initialState);
	const [images, setImages] = useState([]);
	const [selectedCats, setSelectedCats] = useState([]);
	const [imgToDelete, setImgToDelete] = useState([]);

	const { categories } = useSelector(state => state.category);
	const { isPending, productResponse, selectedProduct } = useSelector(
		state => state.product
	);

	useEffect(() => {
		if (!selectedProduct?._id || slug !== selectedProduct.slug) {
			dispatch(fetchAProduct(slug));
			dispatch(fetchCat());
		}

		setUpdateProduct(selectedProduct);
		setSelectedCats(selectedProduct.categories);
	}, [dispatch, selectedProduct, selectedProduct._id, slug]);

	const handleOnChange = e => {
		const { checked, name, value } = e.target;

		if (name === "status") {
			setUpdateProduct({
				...updateProduct,
				status: checked,
			});

			return;
		}

		if (name === "category") {
			setUpdateProduct({
				...updateProduct,
				category: [value],
			});

			return;
		}

		setUpdateProduct({
			...updateProduct,
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

		const { createdAt, updatedAt, __v, categories, slug, ...rest } =
			updateProduct;

		for (const key in rest) {
			if (key === "images") {
				continue;
			}
			if (key === "saleStartDate" || key === "saleEndData") {
				const val = rest[key] ? rest[key] : "";
				formData.append(key, val);
				continue;
			}
			// console.log(key, rest[key]);
			formData.append(key, rest[key]);
		}

		//keep the old images
		formData.append("existingImages", rest.images);

		//add new uploaded images
		images.length && [...images].map(img => formData.append("images", img));

		//add categories
		formData.append("categories", selectedCats);

		//add images to be deleted
		formData.append("imgToDelete", imgToDelete);

		dispatch(updateProductAction(formData, slug));

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

	const handleOnImageDelete = e => {
		const { checked, value } = e.target;

		if (checked) {
			setImgToDelete([...imgToDelete, value]);
		} else {
			const args = imgToDelete.filter(source => source !== value);

			setImgToDelete(args);
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
						checked={updateProduct.status}
						id="custom-switch"
						label="Status"
						onChange={handleOnChange}
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<Form.Label>Title * </Form.Label>
					<Form.Control
						name="title"
						value={updateProduct.title}
						placeholder="product name"
						onChange={handleOnChange}
						required
					/>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label>Price * </Form.Label>
					<Form.Control
						name="price"
						value={updateProduct.price}
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
						value={updateProduct.qty}
						type="number"
						onChange={handleOnChange}
						required
					/>
				</Form.Group>

				<Form.Group className="mb-3">
					<Form.Label> Select categories </Form.Label>
					<ProductCategoryList
						selectedCats={selectedCats}
						handleOnCatSelect={handleOnCatSelect}
					/>
				</Form.Group>

				<Form.Group className="mb-3">
					<Form.Label> Sale Price </Form.Label>
					<Form.Control
						name="salePrice"
						value={updateProduct.salePrice}
						type="number"
						placeholder="40"
						onChange={handleOnChange}
					/>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label> Sale starts date </Form.Label>
					<Form.Control
						name="saleStartDate"
						value={
							updateProduct.saleStartDate
								? updateProduct.saleStartDate?.substr(0, 10)
								: undefined
						}
						type="date"
						onChange={handleOnChange}
					/>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label> Sale End date </Form.Label>
					<Form.Control
						name="saleEndData"
						value={
							updateProduct.saleEndData
								? updateProduct.saleEndData?.substr(0, 10)
								: undefined
						}
						type="date"
						onChange={handleOnChange}
					/>
				</Form.Group>

				<Form.Group className="mb-3">
					<Form.Label> Brand</Form.Label>
					<Form.Control
						name="brand"
						value={updateProduct.brand}
						placeholder="Nike"
						onChange={handleOnChange}
					/>
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label> Description * </Form.Label>
					<Form.Control
						as="textarea"
						name="description"
						value={updateProduct.description}
						style={{ height: "200px" }}
						onChange={handleOnChange}
						required
					/>
				</Form.Group>

				<Form.Group className="mb-3">
					<Form.Label> Select the images to delete</Form.Label>
					<div className="d-flex flex-row">
						{updateProduct?.images &&
							updateProduct.images.map((imgLink, i) => (
								<div className="img-thumbnail" key={i}>
									<Form.Check
										defaultValue={imgLink}
										onChange={handleOnImageDelete}
									/>

									<img src={imgLink} alt="product img" width="150px" />
								</div>
							))}
					</div>
				</Form.Group>
				<Form.Group></Form.Group>
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
					Update Product
				</Button>
			</Form>
		</div>
	);
};
