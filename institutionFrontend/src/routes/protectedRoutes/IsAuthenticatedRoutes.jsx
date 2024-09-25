import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useToast from '../../hooks/useToast';

function IsAuthenticatedRoutes({ element: Component, ...rest }) {
    const showToast = useToast();
    const { isAuthenticated } = useSelector(
        (state) => state.userAuth
    );
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            showToast("Login Required.", "error");
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    if (isAuthenticated) {
        return <Component {...rest} />;
    }

    return null;
}

export default IsAuthenticatedRoutes;
