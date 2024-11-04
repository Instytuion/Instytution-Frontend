

import {  Grid, Typography, Link, TextField, Button } from '@mui/material';
const FooterItem = ({ title, links, text, isSubscription }) => {
    return (
      <Grid item xs={12} md={isSubscription ? 4 : 2}>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        {isSubscription ? (
          <>
            <TextField
              fullWidth
              placeholder="Enter your email address"
              variant="outlined"
              size="small"
              sx={{ backgroundColor: '#fff', borderRadius: 1, mb: 2 }}
            />
            <Button variant="contained" sx={{ backgroundColor: '#d4af37', color: '#000', borderRadius: 1 }}>
              Subscribe
            </Button>
            <Typography variant="body2" sx={{ mt: 2 }}>
              {text}
            </Typography>
          </>
        ) : (
          <>
  
            {links &&
              links.map((link, index) => (
                <Link key={index} href={link.href} color="inherit" underline="none" display="block" sx={{ mb: 1 }}>
                  {link.label}
                </Link>
              ))}
            {text && <Typography variant="body2">{text}</Typography>}
          </>
        )}
      </Grid>
    );
  };
export default FooterItem;  