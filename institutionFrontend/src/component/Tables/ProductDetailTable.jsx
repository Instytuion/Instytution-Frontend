import React from "react";
import {Box, IconButton} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import {useNavigate} from "react-router-dom";

export const ProductDetailColumnsHeading = () => {
  const navigate = useNavigate();

  const handleNavigate = (productId) => {
    navigate("/shop-admin/product/detail-form/", {
      state: {
        mode: "edit",
        id: params.row.id,
      },
    });
  };

  return [
    {field: "rowNumber", headerName: "#", flex: 0.1},
    {
      field: "id",
      headerName: "ID",
      flex: 0.1,
      renderCell: (params) => params.row.id,
    },
    {
      field: "price",
      headerName: "Price",
      flex: 0.1,
      minWidth: 155,
    },
    {
      field: "stock",
      headerName: "Stock",
      flex: 0.1,
    },
    {
      field: "color",
      headerName: "Color",
      flex: 0.1,
    },
    {
      field: "images",
      headerName: "Images",
      flex: 0.2,
      renderCell: (params) => (
        <Box sx={{display: "flex", gap: 1}}>
          {params.row.images.map((image, index) => (
            <img
              key={`${params.row.id}-${image.id || index}`} // Ensures unique keys
              src={image.image}
              alt={image.color}
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                objectFit: "cover",
                cursor: "pointer",
              }}
              onClick={() => window.open(image.image, "_blank")}
            />
          ))}
        </Box>
      ),
    },
    {
      field: "Actions",
      headerName: "Actions",
      flex: 0.1,
      renderCell: (params) => {
        const handleEdit = () => {
          navigate("/shop-admin/product/detail-form/", {
            state: {
              mode: "edit",
              productId: params.row.id,
            },
          });
        };

        return (
          <>
            <IconButton onClick={handleEdit}>
              <EditIcon sx={{color: "#00aeff"}} />
            </IconButton>
          </>
        );
      },
    },
  ];
};
