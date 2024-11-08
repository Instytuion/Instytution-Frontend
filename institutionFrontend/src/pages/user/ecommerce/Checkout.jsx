import React, { useEffect, useState } from "react";
import { Box, Paper, Typography, Stack } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import CheckoutCard from "../../../component/Card/Checkout";
import OrderAddress from "../../../component/PaymentDetails/Address";
import Pagination from "@mui/material/Pagination";
import CheckoutSummary from "../../../component/Card/CheckourSummary";
import OrderService from "../../../services/user/ecommerce/Order";
import useRazorpay from "react-razorpay";
import { VerifyProductRazorpay } from "../../../services/payments/ProductPayment";
import useToast from "../../../hooks/useToast";
import { useQueryClient } from "react-query";
import { useDispatch } from "react-redux";
import { clearCart } from "../../../redux/slices/Cart";
  
const ITEMS_PER_PAGE = 2;

const Checkout = () => {
  const queryClient = useQueryClient(); 
  const navigate = useNavigate()
  const location = useLocation();
  const [Razorpay] = useRazorpay();
  const showToast = useToast()
  const dispatch = useDispatch();
  const cartItems = location.state?.product || [];
  console.log('====================================');
  console.log('cart item si s from state is :', cartItems);
  console.log('====================================');

  useEffect(() => {
    if (!cartItems || cartItems.length === 0) {
      showToast('Sorry, you don\'t have any items in your cart or do not have permission to access this page.', 'error');
      navigate("/store"); 
    }
  }, [cartItems, navigate]);
  

  const {quantity, id} = cartItems
  const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID

  const grandTotal = cartItems.length > 0
  ? cartItems.reduce((total, item) => total + (item.total_price * item.quantity), 0)
  : 0;


  const [page, setPage] = useState(1);
  const [selectedAddressId, setSelectedAddressId] = useState(null);


  const pageCount = Math.ceil(cartItems.length / ITEMS_PER_PAGE);

  const paginatedItems = Array.isArray(cartItems)
  ? cartItems.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)
  : [];



  const handleChange = (event, value) => {
    setPage(value);
  };
  const deliveryCharge = grandTotal > 1000 ? 0 : 50
  const handleOrder = async () => {
    try {
      const orderData = {
        total_amount: grandTotal,
        items: cartItems.map(item => ({
          product: item.product.id,
          quantity: item.quantity,
          total_price: item.total_price,
        })),
       
        address_id: selectedAddressId, 
        delivery_charge: deliveryCharge,
      };
  
      const response = await OrderService(orderData);
      console.log('Order created successfully:', response);
  
      if (response?.razorpay_order_id) {
        if (window.Razorpay) {
          const options = {
            key: RAZORPAY_KEY_ID,
            amount: grandTotal * 100,
            currency: "INR",
            name: "Instytution",
            description: "Order Payment",
            order_id: response.razorpay_order_id,
            handler: async function (paymentResponse) {
              const paymentDetails = {
                razorpay_payment_id: paymentResponse.razorpay_payment_id,
                razorpay_order_id: paymentResponse.razorpay_order_id,
                razorpay_signature: paymentResponse.razorpay_signature,
                address_id: selectedAddressId,
                delivery_charge: deliveryCharge,
                items: orderData.items,
                total_amount: response.total_amount ,
              };
                try {
                    const response =await VerifyProductRazorpay(paymentDetails);                
                    showToast(response.message,'success')
                    dispatch(clearCart()); 
                    queryClient.invalidateQueries('cartItems'); 
                    navigate("/checkout-page/", { state: { product: [] } })
                    navigate('/order/history')
                } catch (error) {
                    showToast(error,'error')
  
                }
              
            },
            prefill: {
              name: "Customer Name",
              email: "customer@example.com",
              contact: "1234567890",
            },
            notes: {
              order_id: response.order_id,
            },
          };
          const razorpay = new window.Razorpay(options);
          razorpay.open();
        }
      }
    } catch (error) {
      console.error("Error during order creation or payment verification:", error);
    }
  };
  
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      width="100vw"
      gap={3}
      p={3}
      sx={{
        flexDirection: { xs: "column", md: "row" },
        alignItems: { xs: "center", md: "flex-start" },
      }}
    >
      <Box width={{ xs: "100%", md: "65%" }} mb={{ xs: 2, md: 0 }}>
        <OrderAddress selectedAddressId={selectedAddressId} setSelectedAddressId={setSelectedAddressId} />
      </Box>

      <Box
        width={{ xs: "100%", md: "40%",sm:'100%' }}
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={2}
      >
        {paginatedItems.map((item) => {
            const filteredImage = item.product.product_images.find(
              (image) => image.color === item.product.color  
            );
            
            return (
              <CheckoutCard
                key={item.id}
                data={{
                  name: item.product.product_name,
                  size: item.product.size ? item.product.size : "One Size",
                  images: filteredImage ? filteredImage.image : '', 
                  total_price: item.total_price,
                  quantity: item.quantity,
                }}
              />
            );
          })}

        <Stack spacing={2} mt={2} alignItems="center">
          <Pagination
            count={pageCount}
            page={page}
            onChange={handleChange}
            color="primary"
          />
        </Stack>

        <CheckoutSummary handleOrder={handleOrder} grandTotal={grandTotal}/>
      </Box>
    </Box>
  );
};

export default Checkout;
