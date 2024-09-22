import { FormControlLabel, Radio, RadioGroup, Typography, Button, Box } from '@mui/material';
import { useContext, useState } from 'react';
import EnrollBatchContext from '../../Context/enrollBatchContext';

function EnrollPaymentForm() {
    const [selectedPayRadio, setSelectedPayRadio] = useState(null);
    const {selectedRowId} = useContext(EnrollBatchContext);

    const handleRadioChange = (event) => {
        setSelectedPayRadio(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Selected Payment Mode:", selectedPayRadio);
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ my: 2 }}>
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
                <FormControlLabel
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
                />
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
