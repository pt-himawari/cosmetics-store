// import "./App.css";
import { Routes, Route } from "react-router-dom";
import CosmeticsPage from "./pages/CosmeticsPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import Dashboard from "./components/Admin/Dashboard/Dashboard";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<CosmeticsPage />} />
        <Route path="/cartpage" element={<CartPage />} />
        <Route path="/chekout" element={<CheckoutPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* <Route path="/" element={<Banner />} />
        <Route path="/" element={<Main />} /> */}
      </Routes>
      {/* <Banner /> */}
    </>
  );
}

export default App;
