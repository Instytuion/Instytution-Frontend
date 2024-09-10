import React from 'react';
import { Box, Container, Grid, Typography,} from '@mui/material';
import FooterItem from './FooterItems';

const Footer = () => {
  const productLinks = [
    { label: 'Landing Page', href: '/' },
    { label: 'Popup Builder', href: '#' },
    { label: 'Web-design', href: '#' },
    { label: 'Content', href: '#' },
    { label: 'Integrations', href: '#' },
  ];

  const useCasesLinks = [
    { label: 'Web-designers', href: '#' },
    { label: 'Marketers', href: '#' },
    { label: 'Small Business', href: '#' },
    { label: 'Website Builder', href: '#' },
  ];

  const companyLinks = [
    { label: 'About Us', href: 'about' },
    { label: 'Careers', href: '#' },
    { label: 'FAQs', href: '#' },
    { label: 'Teams', href: '#' },
    { label: 'Contact Us', href: 'contact' },
  ];

  return (
    <Box sx={{ backgroundColor: '#00796b', color: '#fff', py: 5 }}>
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <FooterItem
            title="SUBSCRIBE"
            isSubscription
            text="Subscribe to stay tuned for new web design and latest updates. Let's do it!"
          />

          <FooterItem title="Product" links={productLinks} />

          <FooterItem title="Use Cases" links={useCasesLinks} />


          <FooterItem title="Company" links={companyLinks} />

    
          <FooterItem
            title="Contact Us"
            text="India, Kerala, Kozhikode"
            links={[
              { label: 'instytution@figma.com', href: 'mailto:instytution@gmail.com' },
              { label: '+91 8113986544', href: 'tel:+918113986544' },
            ]}
          />
        </Grid>

        <Box sx={{ textAlign: 'center', mt: 5 }}>
          <Typography variant="body2">© 2024 All Rights Reserved</Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
