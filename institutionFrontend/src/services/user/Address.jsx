import instance from "../../utils/axios";



const Address = {
  getAddress: async () => {
    const response = await instance.get('accounts/addresses/')
    console.log('====================================');
    console.log('response is :',response);
    console.log('====================================');
    return response.data;
  },

  createAddress : async (newAddress) =>{
    console.log('new address is :',newAddress );
    
    const response = await instance.post('accounts/addresses/', newAddress)
    console.log('====================================');
    console.log('Respobse is :', response);
    console.log('====================================');
    return response.data
  },
  updateAddress: async (addressId, updatedFields) => { // Renamed parameter for clarity
    console.log('Updating address with id:', addressId, 'and fields:', updatedFields);
    const response = await instance.patch(`accounts/addresses/${addressId}/`, updatedFields);
    console.log('Update response:', response);
    return response.data; 
  },

  deleteAddress : async (addressId) =>{
    const response = await instance.delete(`accounts/addresses/${addressId}/`)
    return response
  }
};

export default Address;
