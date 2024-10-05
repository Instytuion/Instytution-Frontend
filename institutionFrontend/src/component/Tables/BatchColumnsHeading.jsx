import React, { useState } from "react";
import {IconButton} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";


export const BatchColumnsHeading = () => {
  const navigate = useNavigate()


  return [
    {field: "rowNumber", headerName: "#"},
    {field: "id", headerName: "ID", flex: 0.1},
    {
      field: "name",
      headerName: "Batch Name",
      flex: 0.3,
      minWidth: 200,
      renderCell: (params) => (
        <div
          style={{
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            maxWidth: "100%",
          }}
        >
          {params.value || "N/A"}
        </div>
      ),
    },
    {field: "course_name", headerName: "Course Name", flex: 0.3, minWidth: 150},
    {
      field: "instructor_name",
      headerName: "Instructor Name",
      flex: 0.2,
      minWidth: 150,
    },
    {
      field: "start_date",
      headerName: "Start Date",
      flex: 0.2,
      renderCell: (params) => params.value || "N/A",
    },
    {
      field: "end_date",
      headerName: "End Date",
      flex: 0.2,
      renderCell: (params) => params.value || "N/A",
    },
    {
      field: "start_time",
      headerName: "Start Time",
      flex: 0.2,
      renderCell: (params) => params.value || "N/A",
    },
    {
      field: "end_time",
      headerName: "End Time",
      flex: 0.2,
      renderCell: (params) => params.value || "N/A",
    },
    {
      field: "strength",
      headerName: "Strength",
      flex: 0.1,
      renderCell: (params) => params.value || "N/A",
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.15,
      renderCell: (params) => {
        const handleEdit = () => {
          navigate("/course-admin/batch-form/", {
            state: {
              mode: "edit",
              courseName: params.row.course_name,
              batchId: params.row.id, 
            },
          });
        };

        return (
          <IconButton onClick={handleEdit}>
            <EditIcon color="primary" />
          </IconButton>
        );
      },
    },
  ];
};
