import {  useState } from "react";
import CustomDataTable from "../../component/Tables/DataTable";
import { ColumnsHeading } from "../../component/Tables/TableColumns";
const ShopeAdmin = () => {
  const [shopeAdmin, setShopeAdmin] = useState([]);
  const title = "ShopeAdmin";
  return (
    <>
      <CustomDataTable rows={shopeAdmin} columns={ColumnsHeading(setShopeAdmin)} title={title} buttonText={"ShopeAdmin"}  setNewUsers={setShopeAdmin} />
    </>
  );
};

export default ShopeAdmin;
