import instance from "../../utils/axios";

const updateProfileService = {
  updateProfileWithEmail: async (data) => {
    console.log("edit profile with email:", data);
    const response = await instance.patch(
      "accounts/user-profile/verify-update/",
      data
    );
    return response.data; 
  },

  updateProfileWithoutEmail: async (data) => {
    console.log("edit profile without email:", data);
    const response = await instance.patch("/accounts/user-profile/", data, {
      headers: {"Content-Type": "multipart/form-data"},
    });
    return response.data; 
  },
};

export default updateProfileService;
