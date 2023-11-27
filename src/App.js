// import "./App.css";
import { Routes, Route } from "react-router-dom";
import CosmeticsPage from "./pages/CosmeticsPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<CosmeticsPage />} />
        {/* <Route path="/" element={<Banner />} />
        <Route path="/" element={<Main />} /> */}
      </Routes>
      {/* <Banner /> */}
    </>
  );
}

export default App;
