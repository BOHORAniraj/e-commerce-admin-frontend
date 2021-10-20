import React from "react";
import { useParams } from "react-router-dom";
import { AddProductForm } from "../../components/product-forms/AddProductForm";
import AdminLayout from "../layout/AdminLayout";

const NewProduct = () => {
	return (
		<AdminLayout>
			<div>
				<h2>Add new product</h2>
				<hr />
				<AddProductForm />
			</div>
		</AdminLayout>
	);
};

export default NewProduct;
