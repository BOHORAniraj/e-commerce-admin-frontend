import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, Button, Spinner, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

import {
	fetchProducts,
	deleteProduct,
} from "../../pages/product/productAction";

export const ProductTable = () => {
	const dispatch = useDispatch();
	const { isPending, productList, productResponse } = useSelector(
		state => state.product
	);

	useEffect(() => {
		!productList?.length && dispatch(fetchProducts());
	}, [dispatch]);

	const handleOnDelete = _id => {
		if (window.confirm("Are you sure you what to delete the product")) {
			_id && dispatch(deleteProduct(_id));
		}
	};
	return (
		<div>
			{isPending && <Spinner variant="info" animation="border" />}

			{productResponse.message && (
				<Alert
					variant={productResponse.status === "success" ? "success" : "danger"}
				>
					{productResponse.message}
				</Alert>
			)}
			<Table striped bordered hover size="sm" className="text-center">
				<thead>
					<tr>
						<th>#</th>
						<th>THUMBNAIL</th>
						<th>STATUS</th>
						<th>NAME</th>
						<th>PRICE</th>
						<th>EDIT</th>
						<th>DELETE</th>
					</tr>
				</thead>
				<tbody>
					{!productList?.length ? (
						<tr>
							<td colSpan="6" className="text-center">
								No Product to show
							</td>
						</tr>
					) : (
						productList.map((row, i) => (
							<tr key={row._id}>
								<td>{i + 1}</td>
								<td>
									<img src={row?.images[0]} alt={row.title} width="100px" />
								</td>
								<td>
									{row.status ? (
										<span className="text-success">Online</span>
									) : (
										<span className="text-danger">Offline</span>
									)}{" "}
								</td>
								<td className="text-start">{row.title}</td>
								<td>${row.price}</td>
								<td>
									<Link to={`/products/edit/${row.slug}`}>
										<Button variant="info">
											<i className="fas fa-pencil-alt"></i> Edit
										</Button>
									</Link>
								</td>
								<td>
									<Button
										variant="danger"
										onClick={() => handleOnDelete(row._id)}
									>
										<i className="fas fa-trash-alt"></i> Delete
									</Button>
								</td>
							</tr>
						))
					)}
				</tbody>
			</Table>
		</div>
	);
};
