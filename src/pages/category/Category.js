import React from "react";
import { BreadcrumbComp } from "../../components/breadcrumb/Breadcrumb";
import { CategoryForm } from "../../components/category-form/CategoryForm";
import AdminLayout from "../layout/AdminLayout";

const Category = () => {
	return (
		<div>
			<AdminLayout>
				<BreadcrumbComp page="Category" />

				<div className="content">
					<div className="category-form">
						<CategoryForm />
					</div>
					<div className="cat-list"></div>
				</div>
			</AdminLayout>
		</div>
	);
};

export default Category;
