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
  editImage: async (formData, imageId) => {
    const response = await instance.patch(
      `shop-admin/product-images/get-update-delete/${imageId}`,
      formData,
      {
        headers: {"Content-Type": "multipart/form-data"},
      }
    );
    return response.data;
  },
  deleteImage: async (imageId) => {
    const response = await instance.delete(
      `shop-admin/product-images/get-update-delete/${imageId}`
    );
    return response.data;
  },
};
