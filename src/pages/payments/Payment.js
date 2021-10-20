import React from "react";
import { Button } from "react-bootstrap";
import { PaymentOptionlist } from "../../components/paymelt-lists/PaymentOptionlist";
import AdminLayout from "../layout/AdminLayout";

const Payment = () => {
	return (
		<div>
			<AdminLayout>
				<h2>Payment page</h2>
				<hr />
				<div className="text-end">
					<Button variant="success">Add New Payment Option</Button>
					<hr />

					<PaymentOptionlist />
				</div>
			</AdminLayout>
		</div>
	);
};
export default Payment;
