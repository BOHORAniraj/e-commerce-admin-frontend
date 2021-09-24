import React from "react";
import { BreadcrumbComp } from "../../components/breadcrumb/Breadcrumb";
import { CategoryForm } from "../../components/category-form/CategoryForm";
import { CategoryList } from "../../components/category-lists/CategoryList";
import AdminLayout from "../layout/AdminLayout";

const Category = () => {
	return (
		<div>
			<AdminLayout>
				<BreadcrumbComp page="Category" />

				<div className="content">
					<div className="category-form">
						<h2>Add new category</h2>
						<CategoryForm />
					</div>
					<hr />
					<div className="cat-list mt-5">
						<h2>Category List</h2>
						<CategoryList />
					</div>
				</div>
			</AdminLayout>
		</div>
	);
};

export default Category;
