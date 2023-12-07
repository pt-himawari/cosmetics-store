import "./App.css";
import { Routes, Route } from "react-router-dom";
import CosmeticsPage from "./pages/CosmeticsPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import DashboardPage from "./pages/Admin/DashboardPage";
import OrderListPage from "./pages/Admin/OrderListPage";
import ProductsPage from "./pages/Admin/ProductsPage";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<CosmeticsPage />} />
        <Route path="/cartPage" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/orderManagement" element={<OrderListPage />} />
        <Route path="/productsMain" element={<ProductsPage />} />
      </Routes>
    </>
  );
}

export default App;
