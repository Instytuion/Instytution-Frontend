import instance from "../../utils/axios";

const WishlistServices = {
  getWishlist: async () => {
    const response = await instance.get("accounts/wishlists/");
    return response.data;
  },
  addWishlist: async (id) => {
    const response = await instance.post(`accounts/wishlist/add/${id}/`);
    return response.data;
  },
  deleteWishlist: async (id) => {
    const response = await instance.delete(`accounts/wishlist/delete/${id}/`);
    return response.data;
  },
};

export default WishlistServices;
