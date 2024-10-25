import { useQuery } from "react-query";
import Footer from "../../component/Footer/Footer";
import Hero from "../../component/Hero/Hero";
import Navbar from "../../component/Navbar/Navbar";
import NewCourse from "../../component/Newcourses/Newcourses";
import Popularcourse from "../../component/Popularcourses/Popularcourse";
import WhyInstyTution from "../../component/WhyinstyTutinon/WhyInstyTution";
import WishlistServices from "../../services/user/Wishlist";
import { setWishlists, clearWishlist } from "../../redux/slices/WishlistSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const Home = () => {

  const dispatch = useDispatch()
  const isAuthenticated = useSelector(
    (state) => state.userAuth.isAuthenticated
  );

  const {
    data: wishlists,
    error,
    isLoading,
  } = useQuery(["Wishlists"], () => WishlistServices.getWishlist(), {
    enabled:isAuthenticated,
    refetchOnWindowFocus: false,
  });
  
  useEffect(() => {
    if (wishlists) {
      dispatch(clearWishlist());
      dispatch(setWishlists(wishlists));
    }
  }, [wishlists, dispatch]);

  
  return (
    <>
      <Navbar /> 
      <Hero />
      <WhyInstyTution />
      <NewCourse/>
      <Popularcourse/>
      <Footer />
    </>
  );
};
export default Home;
