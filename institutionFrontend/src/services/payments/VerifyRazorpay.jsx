import instance from "../../utils/axios"

export  const  VerifyRazorpay = async (data) => {
    const response = await instance.post('payments/razorpay/create_course_payment/',data)
    return response.data
  }
  