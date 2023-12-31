import React from "react";
import { Routes, Route } from "react-router-dom";
import NFCAuth from "../pages/LoginPages/NFCAuth";
import ImageAuth from "../pages/LoginPages/ImageAuth";
import FailedAuth from "../pages/LoginPages/FailedAuth";
import ProductSelection from "../pages/OrderPages/ProductSelection";
import ProductSelected from "../pages/OrderPages/ProductSelected";
import OrderProcessing from "../pages/ResponsePages/OrderProcessing";
import OrderFinished from "../pages/ResponsePages/OrderFinished";
import OrderError from "../pages/ResponsePages/OrderError";

import PrivateRoutes from "./PrivateRoutes";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<NFCAuth />} />
    <Route path="image-auth" element={<ImageAuth />} />
    <Route path="failed-auth" element={<FailedAuth />} />
    <Route element={<PrivateRoutes />}>
      <Route path="product-selection" element={<ProductSelection />} />
      <Route path="product-selected" element={<ProductSelected />} />
      <Route path="order-processing" element={<OrderProcessing />} />
      <Route path="order-finished" element={<OrderFinished />} />
      <Route path="order-error" element={<OrderError />} />
    </Route>
  </Routes>
);

export default AppRoutes;
