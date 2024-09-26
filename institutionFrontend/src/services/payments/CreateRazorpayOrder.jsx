import instance from "../../utils/axios"

export  const  CreateRazorpayOrder = async (data) => {
    const response = await instance.post('payments/razorpay/create_order/',data)
    return response.data
  }
  