import { Navbar } from "./component/Navbar/navbar";
import { ProductList } from "./screen/Product/productList";
import { ProductDetail } from "./screen/Product/productDetail";
import { CartAddRemove } from "./screen/Product/cart";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/cart" element={<CartAddRemove  />} />
        <Route path="/product-details/:id" element={<ProductDetail />} />
      </Routes>
    </>
  );
}

export default App;
