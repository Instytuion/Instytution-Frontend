import instance from "../../../utils/axios"


const CartServices={
    createCart : async (id,quantity=1) =>{
        console.log('quantity :',quantity);
        
        const response =await instance.post(`accounts/cart/detail/${id}/`,{
            quantity:quantity
        })
        return response.data
    },
    getCart : async ()=>{
        const response = await instance.post('accounts/cart/detail/')
        return response.data
    }
}
export default CartServices;