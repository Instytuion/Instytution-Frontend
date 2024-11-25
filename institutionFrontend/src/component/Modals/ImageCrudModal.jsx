import {Modal, Box, Button, Typography} from "@mui/material";
import React, {useEffect, useRef, useState} from "react";
import {CustomFormField} from "../Forms/CustomForm";
import {useForm} from "react-hook-form";

const ImageCrudModal = ({
  open,
  onClose,
  actionType,
  image,
  onAdd,
  onEdit,
  onDelete,
  productId,
}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);
  const [isFile, setIsFile] = useState(false);

  const {
    setValue,
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  useEffect(() => {
    if (image && actionType === "view/edit") {
      setValue("color", image.color);
      setSelectedImage(image.image);
      setIsFile(false);
    } else {
      setSelectedImage(null);
    }
  }, [image, actionType, setValue]);

  const handleFileInputClick = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      const objectUrl = URL.createObjectURL(file);
      setIsFile(true);
      return () => URL.revokeObjectURL(objectUrl);
    }
  };

  const onSubmit = (data) => {
    const formData = new FormData();
    if (actionType === "add") {
      if (selectedImage) {
        formData.append("image", selectedImage);
        formData.append("color", data.color);
        onAdd(formData, productId);
        console.log("Image added");
      } else {
        alert("Please select an image");
      }
    } else if (actionType === "view/edit") {
      if (selectedImage) {
        if (data.color !== image?.color) {
          formData.append("color", data.color);
        } else if (selectedImage !== data.image)
          formData.append("image", selectedImage);
        onEdit(formData, image.id, productId);
        console.log("Image edited");
      } else {
        alert("Please select an image");
      }
    }
    setSelectedImage(null);
  };

  const handleDelete = () => {
    if (image && actionType === "view/edit") {
      onDelete(image.id, productId);
      setSelectedImage(null);
    } else {
      alert("No image to delete.");
    }
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        onClose();
        setSelectedImage(null);
      }}
      BackdropProps={{
        sx: {backgroundColor: "rgba(0, 0, 0, 0.3)"},
      }}
    >
      <Box
        sx={{
          p: 3,
          backgroundColor: "white",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          margin: "auto",
          maxWidth: 340,
          borderRadius: 2,
        }}
      >
        <Typography textAlign="center" variant="h6">
          {actionType === "add" ? "Add New Image" : "Edit Image"}
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: 2,
          }}
        >
          <Box
            sx={{
              width: "100%",
              height: "200px",
              border: "1px dashed #ccc",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              my: 1,
            }}
          >
            {selectedImage ? (
              <img
                src={
                  isFile ? URL.createObjectURL(selectedImage) : selectedImage
                }
                alt="Preview"
                style={{width: "100%", height: "100%", objectFit: "cover"}}
              />
            ) : (
              <Typography color="textSecondary">No Image Selected</Typography>
            )}
          </Box>

          <CustomFormField
            name="color"
            control={control}
            label="Color"
            error={!!errors.color}
            helperText={errors.color ? errors.color.message : ""}
          />

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            style={{display: "none"}}
            accept="image/*"
          />

          <Box sx={{mt: 2, display: "flex", gap: 2}}>
            <Button
              onClick={handleFileInputClick}
              variant="contained"
              color="primary"
            >
              {actionType === "add" ? "Add Image" : "Edit Image"}
            </Button>

            <Button type="submit" variant="contained" color="success">
              Save
            </Button>

            {actionType === "view/edit" && (
              <Button
                onClick={handleDelete}
                variant="outlined"
                color="secondary"
              >
                Delete
              </Button>
            )}
          </Box>
        </Box>

        <Button
          onClick={() => {
            onClose();
            setSelectedImage(null);
          }}
          sx={{mt: 2}}
          variant="text"
        >
          Close
        </Button>
      </Box>
    </Modal>
  );
};

export default ImageCrudModal;
