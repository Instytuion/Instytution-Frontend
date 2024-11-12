import instance from "../../../utils/axios"

const OrderService = async (orderData) => {
    console.log('====================================');
    console.log('order data is :', orderData );
    console.log('====================================');
    try {
        const response = await instance.post('order/create-order/', orderData);
        console.log('====================================');
        console.log('response and orderData is:', orderData, response);
        console.log('====================================');
        return response.data;
    } catch (error) {
        console.error('Error creating order:', error);
        throw error;
    }
};
export default OrderService;