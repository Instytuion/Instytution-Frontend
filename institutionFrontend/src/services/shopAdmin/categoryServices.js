import instance from "../../utils/axios";

export const categoryServices = {
  getSubCategory: async (id) => {
    const response = await instance.get(
      `shop-admin/subcategory/retrive-update/${id}`
    );
    return response.data;
  },
  createSubCategory: async (data) => {
    const response = await instance.post(
      `shop-admin/product/subcategory/create`,
      data
    );
    return response.data;
  },
  updateSubCategory: async (id, data) => {
    const response = await instance.patch(
      `shop-admin/subcategory/retrive-update/${id}`,
      data
    );
    return response.data
  },
};
