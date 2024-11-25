import React from "react";
import {Button, IconButton} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import {useNavigate} from "react-router-dom";

export const SubCategoryTable = () => {
  const navigate = useNavigate();

  const handleNavigate = (id, category) => {
    navigate("/shop-admin/sub-category-form/", {
      state: {
        mode: "edit",
        category: category,
        subCategoryId: id,
      },
    });
  };

  return [
    {field: "rowNumber", headerName: "#"},
    {field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "SubCategory Name",
      minWidth: 200,
      renderCell: (params) => (
        <div
          onClick={() =>
            handleNavigate(
              params.row?.id,
              params.row?.category_name
            )
          }
          style={{
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            maxWidth: "100%",
            cursor: "pointer",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.textDecoration = "underline")
          }
          onMouseOut={(e) => (e.currentTarget.style.textDecoration = "none")}
        >
          {params.value || "N/A"}
        </div>
      ),
    },
    {
      field: "Actions",
      headerName: "Actions",
      renderCell: (params) => (
        <>
          <IconButton
            onClick={() =>
              handleNavigate(
                params.row.id,
                params.row?.category_name
              )
            }
          >
            <EditIcon sx={{color: "#00aeff"}} />
          </IconButton>
        </>
      ),
    },
  ];
};
