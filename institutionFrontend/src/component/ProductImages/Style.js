import {Opacity} from "@mui/icons-material";

const Styles = () => ({
  productImage: {
    height: "100%",
    objectFit: "contain",
    margin: "auto",
  },
  imagePaper: {
    width: "100%",
    height: "19rem",
  },
  subImages: (selectedImage, item) => ({
    opacity: selectedImage === item.image ? 1 : 0.4,
    height: "70px",
    objectFit: "contain",
    border: "1px solid #e5e5e5",
  }),
  subImageBox: {
    width: 70,
    height: 70,
    cursor: "pointer",
    position: "relative",
  },
  containerBox: {
    overflowX: "auto",
  },
  flexContainer: {
    display: "flex",
    width: "500px",
    gap: 1,
    my: 2,
  },
  showMoreButton: {
    width: "90px",
    height: "90px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Styles;
