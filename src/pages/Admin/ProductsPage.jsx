import React from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import ProductsManagement from "../../components/Admin/Dashboard/ProductsManagement";

function ProductsPage() {
  return (
    <DashboardLayout>
      <ProductsManagement />
    </DashboardLayout>
  );
}

export default ProductsPage;
