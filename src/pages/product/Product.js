import { Button } from "react-bootstrap";
import React from "react";
import AdminLayout from "../layout/AdminLayout";
import { ProductTable } from "../../components/product-table/ProductTable";
import { Link } from "react-router-dom";

const Product = () => {
	return (
		<div>
			<AdminLayout>
				<h2>Product page</h2>
				<div className="top-btn text-end">
					<Link to="/products/new">
						<Button variant="primary">
							{" "}
							<i className="fas fa-plus-square"></i> Add new product
						</Button>
					</Link>
				</div>
				<hr />
				<div className="product-list">
					<ProductTable />
				</div>
			</AdminLayout>
		</div>
	);
};

export default Product;
