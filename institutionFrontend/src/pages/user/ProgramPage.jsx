import Footer from "../../component/Footer/Footer";
import Navbar from "../../component/Navbar/Navbar";
import Programs from "../../component/Programs/Programs";
import FetchPrograms from "../../services/courses/FetchPrograms";

const ProgramPage = () => {
  
  return (
    <>
      <Navbar /> 
      <Programs fetchProgrammes={FetchPrograms} 
      linkPrefix="courses"/>
      <Footer />
    </>
  );
};
export default ProgramPage;
