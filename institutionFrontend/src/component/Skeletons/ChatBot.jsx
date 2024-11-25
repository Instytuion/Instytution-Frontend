import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
const    ChatBotMessageSkeleton=()=> {
    return (
    
  
       
        <Skeleton variant="rectangular" width={70} height={25}  sx={{
            maxWidth: "100%",
            padding: "10px 15px",
            borderRadius: "16px",
            backgroundColor: "#c8e6c4",
            boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}/>
    );
  }
export default ChatBotMessageSkeleton;