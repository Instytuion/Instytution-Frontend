import React, {useState} from "react";
import DashboardSummary from "../../component/Dashboard/admin/DashboarAdmin";
import {useQuery} from "react-query";
import reportServices from "../../services/reports/reportServices";
import PurchaseReport from "../../component/Reports/PurchaseReport";
import MonthYearSelector from "../../component/Reports/MonthYearSelector";

const Dashboard = () => {
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const dateData = {
    month: month,
    year: year,
  };
  const {data, error, isLoading} = useQuery(["storeReport", month, year], () =>
    reportServices.getStoreReport(dateData)
  );

  console.log("month", month, "year", year);
  return (
    <>
      <DashboardSummary />
      <MonthYearSelector setMonth={setMonth} setYear={setYear} year={year} />
      <PurchaseReport reportData={data?.purchase_report} title={'Store Report'} />
    </>
  );
};

export default Dashboard;
