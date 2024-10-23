import {Box, Button} from "@mui/material";
import {useEffect, useState} from "react";
import Styles from "./Style";

const ProductImages = ({images}) => {
  const [selectedImage, setSelectedImage] = useState("");
  const [showMore, setShowMore] = useState(false);
  const styles = Styles();

  useEffect(() => {
    if (images.length > 0) {
      setSelectedImage(images[0].image);
    }
  }, [images]);

  const handleImageChange = (image) => {
    setSelectedImage(image);
  };

  const handleShowMore = () => {
    setShowMore((prev) => !prev);
  };

  const displayedImages = showMore ? images : images.slice(0, 2);

  return (
    <Box sx={{height: "auto", width: "290px", margin: "auto"}}>
      <Box sx={styles.imagePaper}>
        <img
          src={selectedImage}
          alt="Product-image"
          style={styles.productImage}
        />
      </Box>
      <Box sx={styles.containerBox}>
        <Box sx={styles.flexContainer}>
          {displayedImages.map((item, idx) => (
            <Box
              onClick={() => handleImageChange(item.image)}
              key={idx}
              sx={styles.subImageBox}
            >
              <img
                src={item.image}
                alt={`Thumbnail ${idx + 1}`}
                style={styles.subImages(selectedImage, item)}
              />
            </Box>
          ))}

          {images.length > 4 && !showMore && (
            <Box sx={styles.subImageBox}>
              <Button
                variant="outlined"
                onClick={handleShowMore}
                sx={styles.showMoreButton}
              >
                +{images.length - 2} More
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ProductImages;
