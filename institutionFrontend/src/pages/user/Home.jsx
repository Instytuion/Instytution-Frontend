import { useEffect } from "react";
import Footer from "../../component/Footer/Footer";
import Hero from "../../component/Hero/Hero";
import Navbar from "../../component/Navbar/Navbar";
import NewCourse from "../../component/Newcourses/Newcourses";
import Popularcourse from "../../component/Popularcourses/Popularcourse";
import WhyInstyTution from "../../component/WhyinstyTutinon/WhyInstyTution";
import instance from "../../utils/axios";
const Home = () => {
  useEffect(()=>{
    console.log('inside use effect to test interceptor');
    const testAxios = async () =>{
      try{
        const response = await instance.get('accounts/user-profile/')
        console.log('response data at axios test',response.data);
        
      }
      catch (error) {
        console.log('error at axios test', error);
      }
    }
    testAxios();
  }, [])
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
