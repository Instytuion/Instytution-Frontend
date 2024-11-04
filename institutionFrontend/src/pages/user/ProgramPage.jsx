import { Box } from "@mui/material";
import Footer from "../../component/Footer/Footer";
import Navbar from "../../component/Navbar/Navbar";
import Programs from "../../component/Programs/Programs";
import FetchPrograms from "../../services/courses/FetchPrograms";
import BackButton from "../../component/Button/BackButton";

const ProgramPage = () => {
  
  return (
    <Box sx={{position: 'relative'}}>
      <BackButton sx={{position:'absolute', top:80, right:["2rem", "2rem", "4rem"]}} />
      <Navbar /> 
      <Programs fetchProgrammes={FetchPrograms} 
      linkPrefix="courses"/>
      <Footer />
    </Box>
  );
};
export default ProgramPage;
