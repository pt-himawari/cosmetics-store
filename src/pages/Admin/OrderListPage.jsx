import React from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import OrderManagement from "../../components/Admin/Dashboard/OrderManagement";

function DashboardPage() {
  return (
    <DashboardLayout>
      <OrderManagement />
    </DashboardLayout>
  );
}

export default DashboardPage;
