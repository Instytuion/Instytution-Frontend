import { Container, Paper, Radio, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import EnrollBatches from '../Tables/EnrollBatches'
import Spinner from '../Spinner/Spinner';
import FetchCourseBatches from '../../services/courses/FetchCourseBatches';
import EnrollPaymentRadio from '../Radios/EnrollPaymentRadio';
import EnrollBatchContext from '../../Context/EnrollBatchContext';

function EnrollSection({courseName, price}) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedRowId, setSelectedRowId] = useState(null);

    useEffect(()=>{
        const FetchData = async ()=>{
          try{
            const response = await FetchCourseBatches(courseName)
            console.log('Fetch related course batch succes - ', response.data);
            setData(response.data)
            setLoading(false)
          }
          catch(error){
            setLoading(false)
            console.log('Error while fetching related course batch - ', error);
          }
        }
    
        FetchData();
      }, [courseName]);
    
      if(loading){
        return <Spinner />
      };
  return (
    <>
    <Container>
        <Typography variant="h5" component="h5" sx={{
            borderBottom:5 ,
            display:'inline-block',
            paddingBottom:1,
            my:2,
            }}>
            Enrollment
        </Typography>
        <Paper sx={{
            p:4,
            mb:2,
            borderRadius:5,
            }}>
            <EnrollBatchContext.Provider value={{selectedRowId, setSelectedRowId}}>
                <EnrollBatches rows={data}/>
                <EnrollPaymentRadio price={price} />
            </EnrollBatchContext.Provider>
        </Paper>
    </Container>
    </>
  )
}

export default EnrollSection
