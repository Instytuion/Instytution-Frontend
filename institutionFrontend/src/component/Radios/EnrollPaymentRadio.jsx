import { FormControlLabel, Radio, RadioGroup, Typography, Button, Box } from '@mui/material';
import { useContext, useState } from 'react';
import EnrollBatchContext from '../../Context/enrollBatchContext';
import { CreateRazorpayOrder } from '../../services/payments/CreateRazorpayOrder';
import Spinner from '../Spinner/Spinner';
import useRazorpay from "react-razorpay";
import { VerifyRazorpay } from '../../services/payments/VerifyRazorpay';

function EnrollPaymentForm({price}) {
    const [loading, setLoading] = useState(false);
    const [selectedPayRadio, setSelectedPayRadio] = useState(null);
    const {selectedRowId} = useContext(EnrollBatchContext);
    const [Razorpay] = useRazorpay();

    const handleRadioChange = (event) => {
        setSelectedPayRadio(event.target.value);
    };

    const handlePayment = async (event) => {
        event.preventDefault();
        setLoading(true)
        const data = {
                amount:price,
                currency:"INR"
            }
        const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID

        try{
            const response = await CreateRazorpayOrder(data)
            console.log('success response data from rz pay order creation - ', response.data);
            setLoading(false)
            const {amount, currency, id} = response.data

            const options = {
                key: RAZORPAY_KEY_ID,
                amount: amount,
                currency: currency,
                name: "Instytution Corp",
                description: "Test Transaction",
                image: "https://example.com/your_logo",
                order_id: id,
                handler: async function (response) {
                    const data = {
                        batch: selectedRowId,
                        payment_id : response.razorpay_payment_id,
                        order_id : response.razorpay_order_id,
                        signature : response.razorpay_signature,
                        amount : amount,
                    }
                    const payment_verify_response = await VerifyRazorpay(data)
                    console.log('payment_verify_response success.');
                    
                },
                prefill: {
                  name: "Test Name",
                  email: "testemail@example.com",
                  contact: "9999999999",
                },
                notes: {
                  address: "Razorpay Corporate Office",
                },
                theme: {
                  color: "#3399cc",
                },
              };
            
              const rzp1 = new Razorpay(options);
            
              rzp1.on("payment.failed", function (response) {
                alert(response.error.reason);
                console.log('Error while payment - ', response.error);
                
              });
            
              rzp1.open();
              
        }
        catch(error){
            console.log('some error happend while creating rz pay order - ', error);
            setLoading(false)            
        }
        finally{
            setLoading(false) 
        }
    };

    if(loading){
        return <Spinner />
      };

    return (
        <Box component="form" onSubmit={handlePayment} sx={{ my: 2 }}>
            <Typography variant="h5" component="h5" sx={{
                display: 'inline-block',
                paddingBottom: 1,
                my: 2,
            }}>
                Select Payment Mode
            </Typography>
            <RadioGroup value={selectedPayRadio} onChange={handleRadioChange}>
                <FormControlLabel
                    control={
                        <Radio
                            value='razorPay'
                            name="payment-radio-buttons"
                            inputProps={{ 'aria-label': 'RazorPay' }}
                            sx={{
                                color: '#00796b',
                                '&.Mui-checked': {
                                    color: '#00796b',
                                },
                            }}
                        />
                    }
                    label="RazorPay"
                />
                {/* <FormControlLabel
                    control={
                        <Radio
                            value='stripe'
                            name="payment-radio-buttons"
                            inputProps={{ 'aria-label': 'Stripe' }}
                            sx={{
                                color: '#00796b',
                                '&.Mui-checked': {
                                    color: '#00796b',
                                },
                            }}
                        />
                    }
                    label="Stripe"
                />
                <FormControlLabel
                    control={
                        <Radio
                            value='paypal'
                            name="payment-radio-buttons"
                            inputProps={{ 'aria-label': 'PayPal' }}
                            sx={{
                                color: '#00796b',
                                '&.Mui-checked': {
                                    color: '#00796b',
                                },
                            }}
                        />
                    }
                    label="PayPal"
                /> */}
            </RadioGroup>
            <Button 
                type="submit" 
                variant="contained" 
                color="primary" 
                sx={{ mt: 2 }}
                disabled={!selectedPayRadio || !selectedRowId}
            >
                Pay Now
            </Button>
        </Box>
    );
}

export default EnrollPaymentForm;
