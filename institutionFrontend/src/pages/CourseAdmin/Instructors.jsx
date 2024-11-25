import { useEffect, useState } from "react";
import CustomDataTable from "../../component/Tables/DataTable";
import LitsUsersByRole from "../../services/admin/UsersLIst";
import { ColumnsHeading } from "../../component/Tables/TableColumns";

const Instructors = () => {
  const title = "Instructors";

  const [instructors, setInstructors] = useState([]);
  // const [currentPage, setCurrentPage] = useState(1); // State for current page
  // const [totalCount, setTotalCount] = useState(0); // State for total count of instructors
  console.log('Instructors are:', instructors);

  // const fetchInstructorss = async (page = 1) => {
  //   try {
  //     const response = await LitsUsersByRole("instructor", page); // Pass page to the service
  //     console.log('Course-admin instructors are:', response);
      
  //     const instructorsWithRowNumbers = response.results.map((row, index) => ({
  //       ...row,
  //       rowNumber: (page - 1) * 10 + index + 1, // Update row numbers based on page
  //     }));
      
  //     setInstructors(instructorsWithRowNumbers);
  //     setTotalCount(response.count); // Set total count for pagination
  //   } catch (error) {
  //     console.log("Error fetching data:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchInstructorss(currentPage); 
  // }, [currentPage]); // Re-fetch when currentPage changes

  // const handleNextPage = () => {
  //   if (currentPage * 10 < totalCount) { // Assuming 10 items per page
  //     setCurrentPage(currentPage + 1);
  //   }
  // };

  // const handlePrevPage = () => {
  //   if (currentPage > 1) {
  //     setCurrentPage(currentPage - 1);
  //   }
  // };

  return (
    <>
      <CustomDataTable 
        rows={instructors} 
        columns={ColumnsHeading(setInstructors)} 
        title={title} 
        buttonText={"Instructors"} 
        setNewUsers={setInstructors} 
      />
      {/* <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button onClick={handleNextPage} disabled={currentPage * 10 >= totalCount}>
          Next
        </button>
      </div> */}
    </>
  );
};

export default Instructors;
