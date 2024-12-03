import instance from "../../utils/axios";

const reportServices = {
  getCourseReport: async (data) => {
    const respose = await instance.post(
      `/course-admin/courses-purchase-report/`,
      data
    );
    return respose.data;
  },
  getStoreReport: async (data) => {
    const respose = await instance.post(
      `/shop-admin/store-purchase-report/`,
      data
    );
    return respose.data;
  },
};

export default reportServices;
