import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const FlexCard = ({ title, duration, price, image, link }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (link) {
      navigate(link);
    }
  };

  return (
    <Card sx={{ 
        width:['200px', '200px', '300px'],
        display: 'flex', 
        flexDirection: 'column', 
        margin: 'auto', 
        cursor: 'pointer',
        boxShadow: 1,
        '&:hover': {
          boxShadow: 8,
        },
      }}
      onClick={handleCardClick}
      >
      <CardMedia>
        <img src="https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2023/02/how-to-create-online-course.webp" alt="Course-image"  sx={{ height: 140, objectFit: 'cover' }}/>
      </CardMedia>
      <CardContent>
        <Typography variant="h6" component="div"
        sx={{
          fontSize: ['1rem', '1rem', '1.5rem'],
        }}
        >
          {title}
        </Typography>
        {duration ? (
          <Typography variant="body2" component="div"
          sx={{
            fontSize: ['0.75rem', '0.75rem', '1rem'],
          }}
          >
            Duration :{duration}
          </Typography>
        ):''}
        {price ? (
          <Typography variant="body2" component="div"
          sx={{
            fontSize: ['0.75rem', '0.75rem', '1rem'],
          }}
          >
            Price: {price}
          </Typography>
        ):''}
      </CardContent>
    </Card>
  );
};
export default FlexCard;
