import React from "react";

import { EditProductForm } from "../../components/product-forms/EditProductForm";
import AdminLayout from "../layout/AdminLayout";

const EditProduct = () => {
	return (
		<AdminLayout>
			<div>
				<h2>Update product</h2>
				<hr />

				<EditProductForm />
			</div>
		</AdminLayout>
	);
};

export default EditProduct;
