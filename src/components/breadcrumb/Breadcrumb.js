import React from "react";
import { Breadcrumb } from "react-bootstrap";

export const BreadcrumbComp = ({ page }) => {
	return (
		<div>
			<Breadcrumb>
				<Breadcrumb.Item>{page}</Breadcrumb.Item>
			</Breadcrumb>
		</div>
	);
};
