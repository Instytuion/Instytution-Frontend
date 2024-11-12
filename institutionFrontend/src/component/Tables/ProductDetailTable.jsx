import React, {useState} from "react";
import {Box, IconButton} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import {useNavigate} from "react-router-dom";
import {AddIcCallOutlined, AddRounded} from "@mui/icons-material";
import ImageCrudModal from "../Modals/ImageCrudModal";
import {gridColumnVisibilityModelSelector} from "@mui/x-data-grid";
import {useQueryClient} from "react-query";
import useToast from "../../hooks/useToast";
import {productImgagServices} from "../../services/shopAdmin/productImageServices";

export const ProductDetailColumnsHeading = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [actionType, setActionType] = useState(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const showToast = useToast();
  const handleAddClick = () => {
    setActionType("add");
    setIsModalOpen(true);
  };

  const handleImageClick = (image) => {
    setActionType("view/edit");
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
    setActionType(null);
  };

  const handleAddImage =  (data, productId) => {
    try {
      console.log("entered in Adding Image", data , productId)
      productImgagServices.addImage(data, productId);
      showToast("Product image added succussfully", "success");
    } catch (error) {
      showToast("unexpected error occur", error);
      console.log("error ", error);
    }
    queryClient.invalidateQueries(["product", productId]);
    handleCloseModal();
    setSelectedImage(null);
  };

  const handleEditImage = (data, imageId, productId) => {
    try {
      productImgagServices.editImage(data, imageId);
      showToast("Product image edited succussfully", "success");
      queryClient.invalidateQueries(["product", productId]);
    } catch (error) {
      showToast("unexpected error occur", "error");
      console.log("error ", error);
    }
    handleCloseModal();
    setSelectedImage(null);
  };

  const handleDeleteImage = (imageId, productId) => {
    console.log("Delete Image");
    try {
      productImgagServices.deleteImage(imageId);
      showToast("Image deleted succussfully", "success");
      queryClient.invalidateQueries(["product", productId]);
    } catch (error) {
      showToast("unexpected error occur", "error");
      console.log(error);
    } finally {
      handleCloseModal();
      setSelectedImage(null);
    }
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
      field: "size",
      headerName: "Size",
      flex: 0.1,
      renderCell: (params) => params.row.size || "N/A",
    },

    {
      field: "images",
      headerName: "Images",
      flex: 0.2,
      renderCell: (params) => (
        <Box sx={{display: "flex", justifyContent: "space-between", ml: 2}}>
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
                onClick={() => handleImageClick(image)}
              />
            ))}
          </Box>

          <IconButton onClick={handleAddClick}>
            <AddRounded sx={{color: "#00aeff"}} />
          </IconButton>
        </Box>
      ),
    },
    {
      field: "Actions",
      headerName: "Actions",
      flex: 0.1,
      renderCell: (params) => {
        const handleEdit = () => {
          navigate("/shop-admin/product-detail-form", {
            state: {
              mode: "edit",
              detailId: params.row.id,
              productId: params.row.productId,
              category: params.row.productCategory
            },
          });
        };

        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <IconButton onClick={handleEdit}>
              <EditIcon sx={{color: "#00aeff"}} />
            </IconButton>
          </Box>
        );
      },
    },
    {
      field: "",
      hide: isModalOpen,
      flex: 0,
      renderCell: (params) => {
        return (
          <>
            <ImageCrudModal
              open={isModalOpen}
              onClose={handleCloseModal}
              actionType={actionType}
              image={selectedImage}
              onAdd={handleAddImage}
              onEdit={handleEditImage}
              onDelete={handleDeleteImage}
              productId={params.row.productId}
            />
          </>
        );
      },
    },
  ];
};
