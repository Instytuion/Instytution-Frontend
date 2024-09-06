

import loader from "../../assets/Spinner.gif"
const Spinner = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      
      <img
        className="w-16 h-16 md:w-24 md:h-24 lg:w-72 lg:h-72"
        src={loader}
        alt="Loading..."
      />
    </div>
  );
};

export default Spinner;