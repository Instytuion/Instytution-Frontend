
// import { Avatar, IconButton } from "@mui/material";
// import PersonIcon from "@mui/icons-material/Person";
// import CheckIcon from "@mui/icons-material/Check";
// import CloseIcon from "@mui/icons-material/Close";
// import { updateUserStatus } from "../../services/unblockAndBlock/UserController";
// import useToast from "../../hooks/useToast";
// import { useSelector } from "react-redux";

// export const ColumnsHeading = (setUsers ) => {
  
//     const showToast = useToast();
//  const userRole = useSelector((state) => state.userAuth.role);
//  console.log('user4 roe ojdgnshog dshgdsohgh',userRole);
 
//   return [
//     { field: "rowNumber", headerName: "No.", flex: 0.01, text: 'center' },
//     { field: "id", headerName: "ID", flex: 0.01 },
//     {
//       field: "profile_picture",
//       headerName: "Profile Picture",
//       renderCell: (params) => {
//         const { value, row } = params;
//         const firstLetter = row.email ? row.email.charAt(0).toUpperCase() : "N/A";

//         return value ? (
//           <img
//             src={value}
//             alt="Profile"
//             style={{ width: 40, height: 40, marginTop: 5, borderRadius: "50%" }}
//           />
//         ) : (
//           <Avatar
//             sx={{ marginTop: 1, backgroundColor: "teal" }}
//           >
//             {firstLetter ? firstLetter : <PersonIcon />}
//           </Avatar>
//         );
//       },
//     },
//     {
//       field: "email",
//       headerName: "Email",
//       minWidth: 250,
//       maxWidth: 400,
//       renderCell: (params) => (
//         <div
//           style={{
//             overflow: "hidden",
//             whiteSpace: "nowrap",
//             textOverflow: "ellipsis",
//             maxWidth: "100%",
//           }}
//         >
//           {params.value}
//         </div>
//       ),
//     },
//     { field: "first_name", headerName: "First Name", renderCell: (params) => params.value || "N/A", flex: 0.13, minWidth: 100 },
//     { field: "last_name", headerName: "Last Name", renderCell: (params) => params.value || "N/A", flex: 0.13, minWidth: 100 },
//     {
//       field: "is_active",
//       headerName: "Active",
//       type: "boolean",
//       flex: 0.1,
      
//       renderCell: (params) => {
//         const { row } = params;

//         const toggleStatus = async () => {
//           const newStatus = !row.is_active;
//           try {
//             console.log('starting -----------------------------');
//                         console.log(userRole, "THisis user totrel");

//             const response = await updateUserStatus(
//               row.id,
//               newStatus,
//               userRole
//             );
//             console.log(" ----------------------------------------------usr id , row id ,new status ",  row, newStatus);
//             setUsers((prev) =>
//               prev.map((user) => (user.id === row.id ? { ...user, is_active: newStatus } : user))
//             );
           
            
//             showToast(`${row.first_name} ${newStatus ? "UNBlocked" : "Blocked"} Successfully`,'success');
//           } catch (error) {
//             console.log('Eroor is ',error);
            
//             showToast(error.response.data,'error');
//           }
//         };

//         return (
//           <IconButton sx={{ color: params.value ? 'green' : 'red', fontSize: 18 }} onClick={toggleStatus}>
//             {row.is_active ? <CheckIcon color="success" /> : <CloseIcon color="error" />}
//           </IconButton>
//         );
//       }
//     },
//     { field: "role", headerName: "Role", flex: 0.1 },
//   ];
// };









import { Avatar, IconButton } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import useToast from "../../hooks/useToast";
import { useSelector } from "react-redux";

export const ColumnsHeading = (setUsers ,handleOpenConfirmModal) => {  
    const showToast = useToast();
 const userRole = useSelector((state) => state.userAuth.role);
 console.log('user4 roe ojdgnshog dshgdsohgh',userRole);
 
  return [
    { field: "rowNumber", headerName: "No.", flex: 0.01, text: 'center' },
    { field: "id", headerName: "ID", flex: 0.01 },
    {
      field: "profile_picture",
      headerName: "Profile Picture",
      renderCell: (params) => {
        const { value, row } = params;
        const firstLetter = row.email ? row.email.charAt(0).toUpperCase() : "N/A";

        return value ? (
          <img
            src={value}
            alt="Profile"
            style={{ width: 40, height: 40, marginTop: 5, borderRadius: "50%" }}
          />
        ) : (
          <Avatar
            sx={{ marginTop: 1, backgroundColor: "teal" }}
          >
            {firstLetter ? firstLetter : <PersonIcon />}
          </Avatar>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 250,
      maxWidth: 400,
      renderCell: (params) => (
        <div
          style={{
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            maxWidth: "100%",
          }}
        >
          {params.value}
        </div>
      ),
    },
    { field: "first_name", headerName: "First Name", renderCell: (params) => params.value || "N/A", flex: 0.13, minWidth: 100 },
    { field: "last_name", headerName: "Last Name", renderCell: (params) => params.value || "N/A", flex: 0.13, minWidth: 100 },
    {
      field: "is_active",
      headerName: "Active",
      type: "boolean",
      flex: 0.1,
      
      renderCell: (params) => {
        const { row } = params;
        const toggleStatus = () => {
          const actionType = row.is_active ? 'block' : 'unblock'; 
          handleOpenConfirmModal(row, actionType); 
        };
        return (
          <IconButton sx={{ color: params.value ? 'green' : 'red', fontSize: 18 }} onClick={toggleStatus}>
            {row.is_active ? <CheckIcon color="success" /> : <CloseIcon color="error" />}
          </IconButton>
        );
      }
    },
    { field: "role", headerName: "Role", flex: 0.1 },
  ];
};
