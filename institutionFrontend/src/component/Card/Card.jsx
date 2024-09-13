import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CommonCard = ({ name, duration, price, image, link }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (link) {
      navigate(link);
    }
  };

  return (
    <Card sx={{ 
        maxWidth: 345, 
        height: '100%',
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
        <img src={image} alt={`${name}-image`}  sx={{ height: 140, objectFit: 'cover' }}/>
      </CardMedia>
      <CardContent>
        <Typography variant="h6" component="div"
        sx={{ minHeight: 70 }}
        >
          {name}
        </Typography>
        {duration ? (
          <Typography variant="body2" component="div">
            Duration :{duration}
          </Typography>
        ):''}
        {price ? (
          <Typography variant="body2" component="div">
            Price: {price}
          </Typography>
        ):''}
      </CardContent>
    </Card>
  );
};
export default CommonCard;
