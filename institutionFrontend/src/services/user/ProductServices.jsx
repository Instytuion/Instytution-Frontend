import instance from "../../utils/axios";

const ProductsServices = {
  getProducts: async (category) => {
    const response = await instance.get(`store/list-create/${category}`);
    return response.data;
  },
};

export default ProductsServices