import instance from "../../utils/axios";

export const CreateUsersByRole = async (data, userRole) => {
  const url =
    userRole === "admin"
      ? "accounts/subadmin-create/"
      : "accounts/instructor-create/";
      console.log('userRole', userRole)
  const response = await instance.post(url, data);
  return response.data;
};
