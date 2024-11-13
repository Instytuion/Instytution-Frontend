import React from "react";
import { Link } from "react-router-dom";
import { Breadcrumbs, Typography } from "@mui/material";

const CustomeBreadCrumbs = ({ links }) => {
  return (
    <Breadcrumbs sx={{ mb: 4 }} aria-label="breadcrumb" separator="❯">
      {links.map((link, index) => {
        const isLast = index === links.length - 1;

        return (
          <span
            key={index}
            style={{
              cursor: isLast ? "default" : "pointer",
              textDecoration: isLast ? "none" : "underline",
            }}
          >
            {!isLast ? (
              <Link
                to={{
                  pathname: link.path,
                  state: link.state, 
                }}
                style={{textDecoration: "none"}}
              >
                <Typography color="text.primary">{link.label}</Typography>
              </Link>
            ) : (
              <Typography color="inherit">{link.label}</Typography>
            )}
          </span>
        );
      })}
    </Breadcrumbs>
  );
};

export default CustomeBreadCrumbs;
