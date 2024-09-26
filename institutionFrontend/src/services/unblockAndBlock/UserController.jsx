import instance from "../../utils/axios";

export const updateUserStatus = async (userId, newStatus) => {
   
      const response = await instance.patch(`/custom-admin/user-block-unblock/${userId}/`, { is_active: newStatus });
      return response.data;
    
  };
  