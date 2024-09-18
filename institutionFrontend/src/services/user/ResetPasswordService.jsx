import { noAuthInstance } from "../../utils/axios"


const resetPassword = {
  confirmResetPassword: async (uid, password) => {
    const response = await noAuthInstance.post(`accounts/reset/${uid}/`, {
      password: password,
    });
    return response.data;
  },

  requestResetPassword: async (email) => {
    const response = await noAuthInstance.post("accounts/password-reset/", {
      email: email,
    });
    return response.data;
  },
};

export default resetPassword;