import React, {useState} from "react";
import {useQuery} from "react-query";
import reportServices from "../../services/reports/reportServices";
import MonthYearSelector from "../../component/Reports/MonthYearSelector";
import {useLocation} from "react-router-dom";
import PurchaseReport from "../../component/Reports/PurchaseReport";

const Reports = () => {
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const location = useLocation();

  const dateData = {
    month: month,
    year: year,
  };

  const reportType = (() => {
    if (location.pathname.includes("course")) {
      return {name: "courseReport", service: reportServices.getCourseReport};
    }
    if (location.pathname.includes("shop")) {
      return {name: "storeReport", service: reportServices.getStoreReport};
    }
    return null;
  })();
  const {data, error, isLoading} = useQuery(
    [`${reportType?.name}`, year, month],
    () => reportType?.service(dateData),
    {enabled: !!reportType}
  );

  return (
    <>
      <MonthYearSelector setMonth={setMonth} setYear={setYear} year={year} />
      {isLoading && <div>Loading...</div>}
      {error && <div>Error loading report.</div>}
      <PurchaseReport
        reportData={data?.purchase_report}
        title={reportType?.name === "courseReport" ? "Course Report" : "Store Report"}
      />
    </>
  );
};

export default Reports;
