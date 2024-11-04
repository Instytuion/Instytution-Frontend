import { Button, Container, Stack, Typography } from "@mui/material"
import { TypoBodyMt0 } from "../CustomeElements/CourseDetailPageElements";
import bannerButtonBg from "../../assets/banner button sec bg.png"
import outerBg from "../../assets/Banner Course Detail.png"
import { useNavigate } from "react-router-dom";


function HeroCourseDetail({name, description, price, duration, level, courseName}) {
    const navigate = useNavigate()
  return (
    <Container maxWidth={false} disableGutters
    sx={{
        mt:2
    }}
    >
        <Container sx={{
            minHeight: ['400px', '400px', '375px'],
            backgroundImage: `url(${outerBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'left',
            backgroundRepeat: 'no-repeat',
        }}>
            <Stack direction={{ xs: 'column', md: 'row' }}
            >
                <Stack direction='column'
                spacing={2}
                sx={{
                    width: ['100%', '100%', '75%'],
                    padding: [1, 2, 3],
                }}
                >
                    <Typography
                    variant="h3"
                    component="h3"
                    sx={{
                        textAlign:['center', 'center', 'left']
                    }}
                    >
                        {name}
                    </Typography>
                    <Typography variant="body1" component="p">
                        {description}
                    </Typography>
                    <Typography variant="body2" component="p">
                        Duration: {duration}
                    </Typography>
                    <TypoBodyMt0 variant="body2" component="p"
                    >
                        Price: {price}
                    </TypoBodyMt0>
                    <TypoBodyMt0 variant="body2" component="p">
                        Level: {level}
                    </TypoBodyMt0>
                </Stack>
                <Stack sx={{
                    minHeight: '150px',
                    width: ['100%', '100%', '25%'],
                    alignItems: 'center',
                    justifyContent: 'center',
                    my:1,
                    backgroundImage: `url(${bannerButtonBg})`,
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}>
                    <Button variant="outlined" size='small'
                        onClick={()=> navigate(`/courses/enrollCourse/${courseName}`, {
                            state: {price}
                        })}
                        sx={{
                            color: 'white', 
                            border: 0,
                            '@media (min-width: 900px)': {
                            fontSize: '1rem', 
                            border: 1,
                            borderColor: 'white', 
                            '&:hover': {
                                borderColor: 'white', 
                                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                            },
                            },
                        }}
                    >
                        Enroll Now
                    </Button>
                </Stack>

            </Stack>
        </Container>
    </Container>
    
  )
}



export default HeroCourseDetail
