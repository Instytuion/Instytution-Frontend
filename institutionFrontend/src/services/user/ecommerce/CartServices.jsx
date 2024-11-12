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
        const response = await instance.get('accounts/cart/detail/')
        console.log('Get Cart Response is:',response);
        
        return response.data
    },
    cartDelete: async (id)=>{
        console.log('id is :',id);
        
        const response = await instance.delete(`accounts/cart/${id}/`)
    }   
}
export default CartServices;