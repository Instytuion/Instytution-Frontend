import { useEffect } from 'react';
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom';

function SignUpLoginProtectRoutes({ element: Component, ...rest }) {
    const { isAuthenticated } = useSelector(
        (state) => state.userAuth
    );
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        if(isAuthenticated){
            navigate('/')
        }
    });

    if (!isAuthenticated) {
        return <Component {...rest} />;
      }
    
    return null;
};

export default SignUpLoginProtectRoutes
