import React from "react";
import MainLayout from "../layouts/MainLayout";
import Banner from "../components/Banner/Banner";
import CosmeticsDetails from "../components/Main/Products/CosmeticsDetails";

const CosmeticsDetailsPage = () => {
  return (
    <MainLayout>
      <CosmeticsDetails />
    </MainLayout>
  );
};

export default CosmeticsDetailsPage;
