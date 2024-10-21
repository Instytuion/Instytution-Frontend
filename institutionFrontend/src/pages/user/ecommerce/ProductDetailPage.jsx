import ProductImages from "../../../component/ProductImages/ProductImage"
import { useLocation } from "react-router-dom";

const ProductDetailPage = ()=>{
    const location = useLocation()
    const  {productData} = location.state || {}
    console.log('====================================');
    console.log("product Datas are :",productData);
    console.log('====================================');
    return (
        <>
       
        Hello Image is het Product Detail Page{ productData && productData.length > 0 ? " und":"illa"}
        <ProductImages images={productData[0].images}/>
        </>
    )
}
export default ProductDetailPage;