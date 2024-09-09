import Footer from "../../component/Footer/Footer";
import Hero from "../../component/Hero/Hero";
import Navbar from "../../component/Navbar/Navbar";
import NewCourse from "../../component/Newcourses/Newcourses";
import Popularcourse from "../../component/Popularcourses/Popularcourse";
import WhyInstyTution from "../../component/WhyinstyTutinon/WhyInstyTution";

const Home = () => {
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
