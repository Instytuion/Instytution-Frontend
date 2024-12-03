import instance from "../../utils/axios";

export const updateUserStatus = async (userId, newStatus=null, userRole=null) => {
   console.log("userRole:pn update services fiel ", userRole);
    const url =
      userRole !== "course_admin"
        ? `/custom-admin/user-block-unblock/${userId}/`
        : `/custom-admin/instructore-block-unblock/${userId}/`;
      console.log('userRole:', userRole, 'url:', url);
      const response = await instance.patch(url,{is_active: newStatus});
      return response.data;
    
  };
  