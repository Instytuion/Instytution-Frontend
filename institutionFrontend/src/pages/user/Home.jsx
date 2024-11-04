import {useQuery} from "react-query";
import Footer from "../../component/Footer/Footer";
import Hero from "../../component/Hero/Hero";
import Navbar from "../../component/Navbar/Navbar";
import NewCourse from "../../component/Newcourses/Newcourses";
import Popularcourse from "../../component/Popularcourses/Popularcourse";
import WhyInstyTution from "../../component/WhyinstyTutinon/WhyInstyTution";
import WishlistServices from "../../services/user/Wishlist";
import {setWishlists, clearWishlist} from "../../redux/slices/WishlistSlice";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import useCartAndWishlist from "../../hooks/useCartAndWishlist";
import { clearCart, setCart } from "../../redux/slices/Cart";

const Home = () => {
  const dispatch = useDispatch();
  const {wishlists,cartItems} = useCartAndWishlist();
  console.log('cart Items are :',cartItems);
  

  useEffect(() => {
    if (wishlists) {
      dispatch(clearWishlist());
      dispatch(clearCart())
      dispatch(setCart(cartItems))
      dispatch(setWishlists(wishlists));
    }
  }, [wishlists,cartItems, dispatch,]);

  return (
    <>
      <Navbar />
      <Hero />
      <WhyInstyTution />
      <NewCourse />
      <Popularcourse />
      <Footer />
    </>
  );
};
export default Home;
