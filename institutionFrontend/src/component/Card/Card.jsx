import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Stack,
  IconButton,
  Box,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {useLocation, useNavigate} from "react-router-dom";
import {useTheme} from "@emotion/react";
import Tooltip from "@mui/material/Tooltip";

const CommonCard = ({name, duration, price, image, link}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

  const pathParts = location.pathname.split("/");
  console.log('====================================');
  console.log('path part',pathParts.at(-1));
  console.log('====================================');
  const isInCourses = pathParts.length == 4 && pathParts[2] === "programs";
  const isInPrograms = pathParts.length == 3 && pathParts[2] === "programs";

  const isCourseAdmin = location.pathname.includes("/course-admin");

  const handleCardClick = () => {
    if (isCourseAdmin && isInCourses) {
      navigate("/course-admin/course-form", {
        state: {mode: "edit", courseName: name},
      });
    } else if (link) {
      navigate(link);
    }
  };

  return (
    <Card
      sx={{
        maxWidth: 345,
        display: "flex",
        flexDirection: "column",
        margin: "auto",
        cursor: "pointer",
        borderRadius: 2,
        transition: "box-shadow 0.5s ease",
        "&:hover": {
          boxShadow: theme.palette.shadow,
        },
      }}
      onClick={handleCardClick}
    >
      {/* Image Section */}
      <CardMedia
        component="img"
        image={image}
        alt={`${name}-image`}
        sx={{
          borderRadius: 5,
          padding: 1.5,
          width: "100%", // Ensure image takes full width
          objectFit: "cover",
          height: ["15rem"],
        }}
      />

      {/* Content and Actions Section */}
      <CardContent
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexGrow: 1,
          flexDirection: "column",
        }}
      >
        {/* Course Details */}
        <Box sx={{flex: 1}}>
          <Typography
            variant="h6"
            component="div"
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 1,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
              fontWeight: "bold",
              mb: 1,
            }}
          >
            {name}
          </Typography>
          {duration && (
            <Typography variant="body1" component="div">
              <strong>Duration:</strong> {duration} weeks
            </Typography>
          )}
          {price && (
            <Typography variant="body2" component="div">
              <strong>Price:</strong> {price}
            </Typography>
          )}
        </Box>

        {/* Program Card Icons */}
        {isCourseAdmin && isInPrograms && (
          <Stack
            spacing={1}
            alignItems="flex-end"
            justifyContent="flex-start"
            sx={{ml: 2}}
          >
            <Tooltip title="Edit Program" arrow>
              <IconButton
                aria-label="edit"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate("/course-admin/program-form", {
                    state: {mode: "edit", programName: name},
                  });
                }}
                sx={{
                  padding: 0,
                  "& .MuiSvgIcon-root": {fontSize: 20},
                }}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        )}

        {/* course Card Icons */}
        {/* {isInCourses && isCourseAdmin && (
          <Stack
            spacing={1}
            alignItems="flex-end"
            justifyContent="flex-start"
            sx={{ml: 2}}
          >
            <Tooltip title="Edit Course" arrow>
              <IconButton
                aria-label="edit"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate("/course-admin/course-form", {
                    state: {mode: "edit", courseName: name},
                  });
                }}
                sx={{
                  padding: 0,
                  "& .MuiSvgIcon-root": {fontSize: 20},
                }}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="View Batches" arrow>
              <IconButton
                aria-label="view batches"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/course-admin/batches/${name}`);
                }}
                sx={{
                  padding: 0,
                  "& .MuiSvgIcon-root": {fontSize: 20},
                }}
              >
                <VisibilityIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="View Lessons" arrow>
              <IconButton
                aria-label="view lessons"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/course-admin/lessons/${name}`);
                }}
                sx={{
                  padding: 0,
                  "& .MuiSvgIcon-root": {fontSize: 20},
                }}
              >
                <AddCircleIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        )} */}
        {isInCourses && isCourseAdmin && (
          <Stack direction={"row"} justifyContent={"between"} gap={1} mt={1}>
            <Button
              sx={{
                width: "50%",
                bgcolor: "#00796b",
                color: "white",
                fontSize: 12,
              }}
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/course-admin/batches/${name}`, { state: { programeName: pathParts.at(-1) } });

              }}
            >
              Batches
            </Button>
            <Button
              sx={{
                width: "50%",
                bgcolor: "#00796b",
                color: "white",
                fontSize: 12,
              }}
              onClick={(e) => {
                e.stopPropagation();
               navigate(`/course-admin/lessons/${name}`, { state: { programeName: pathParts.at(-1) } });
              }}
            >
              Lessons
            </Button>
          </Stack>
        )}
      </CardContent>
    </Card>
  );
};

export default CommonCard;
