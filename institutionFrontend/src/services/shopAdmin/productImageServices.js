import instance from "../../utils/axios";

export const productImgagServices = {
  addImage: async (formData, id) => {
    const response = await instance.post(
      `shop-admin/product-images/list-create/${id}`,
      formData,
      {
        headers: {"Content-Type": "multipart/form-data"},
      }
    );
    return response.data;
  },
};
