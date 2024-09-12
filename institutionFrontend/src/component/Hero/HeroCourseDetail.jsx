import { Container, Stack, Typography } from "@mui/material"
import { styled } from '@mui/system';


function HeroCourseDetail() {
  return (
    <Container>
        <Stack direction={{ xs: 'column', md: 'row' }}
        spacing={2}
        >
            <Stack direction='column'
            spacing={2}
            sx={{
                width: ['100%', '100%', '50%'],
            }}
            >
                <Typography
                variant="h3"
                component="h3"
                sx={{
                    textAlign:['center', 'center', 'left']
                }}
                >
                    Course title
                </Typography>
                <Typography variant="body2" component="p">
                    Description: Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, excepturi. Vero similique eum, 
                    soluta perferendis ipsa architecto cumque corrupti reprehenderit ut dicta corporis 
                    quod minus rerum distinctio iure optio ratione.
                </Typography>
                <TypoBodyMt0 variant="body2" component="p">
                    Duration
                </TypoBodyMt0>
                <Typography variant="body2" component="p"
                >
                    Price
                </Typography>
                <TypoBodyMt0 variant="body2" component="p">
                    Level
                </TypoBodyMt0>
            </Stack>
            <Stack>
                Enroll stack
            </Stack>

        </Stack>
    </Container>
  )
}

const TypoBodyMt0 = styled(Typography)({
    color:'blue',
    marginTop: '0px !important',
});

export default HeroCourseDetail
