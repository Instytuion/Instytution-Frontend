import { Box, Skeleton } from "@mui/material";

const OTPSkeleton = () => {
  const numInputs = 6;
  return (
<Box sx={{ display: "flex", gap: 1, justifyContent: "center", alignItems: 'center' ,marginTop:4 }}>

      {Array.from({ length: numInputs }).map((_, index) => (
        <Skeleton
          key={index}
          variant="rectangular"
          width={40}
          height={50}
          sx={{
            borderRadius: 1,
            bgcolor: "rgba(0, 0, 0, 0.2)", 
          }}
        />
      ))}
    </Box>
  );
};

export default OTPSkeleton;
