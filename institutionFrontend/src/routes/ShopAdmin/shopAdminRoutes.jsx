import {Suspense, lazy} from "react";
import {Routes, Route} from "react-router-dom";
import CartLoader from "../../component/Spinner/CartLoader";
import PageNotFoundPage from "../../component/ErrorPages/PageNotFound";
import Layout from "../../layout/AdminLayout/AdminLayout";
import ShopAdminSideBar from "../../layout/ShopAdmin/ShopAdminSideBar";
import Products from "../../pages/ShopAdmin/Products";
import ProductDetails from "../../pages/ShopAdmin/ProductDetails";
import ProductForm from "../../pages/ShopAdmin/ProductForm";
const Dashboard = lazy(() => import("../../pages/ShopAdmin/Dashboard"));

function ShopAdminRoutes() {
  return (
    <Suspense fallback={<CartLoader />}>
      <Routes>
        <Route
          path="/"
          element={<Layout SidebarComponent={ShopAdminSideBar} />}
        >
          <Route path="/" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/details/:id/" element={<ProductDetails />} />
          <Route path="/product-form" element={<ProductForm />} />

          <Route path="*" element={<PageNotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default ShopAdminRoutes;
