import { Container, Typography } from '@mui/material'
import UpComingBatchTable from '../../component/Tables/UpComingBatchTable'
import { useSelector } from 'react-redux'
import { useQuery } from 'react-query';
import InstructorServices from '../../services/instructor/InstructorServices';
import BookLoaderJson from '../../component/Spinner/BookLoaderJson';


const InstructorHomePage = () => {
  const instructor = useSelector((state)=> state.userAuth.email);
  const {data, error, isLoading} = useQuery(
    ["instructorBatches", instructor],
    () => InstructorServices.getInstructorBatches(),
    {
      staleTime:Infinity,
      refetchInterval: 60000,
    }
  );

  if (isLoading) {
    return <BookLoaderJson/>;
  }

  if (error) {
    return <div>Error fetching batches: {error.data}</div>;
  }
  
  return (
    <Container
    sx={{py:4}}
    >
      <Typography variant="h5" component="h2" 
      sx={{borderBottom:5 ,display:'inline-block',ml:2, mb:2}}
      >
        Batches
      </Typography>
      <UpComingBatchTable 
      rows={data}
      actions={true}
      />
    </Container>
  )
}

export default InstructorHomePage


