import instance from "../../utils/axios"

export  const  VerifyProductRazorpay = async (data) => {
    const response = await instance.post('order/verify-order/',data)
    return response.data
  }
    