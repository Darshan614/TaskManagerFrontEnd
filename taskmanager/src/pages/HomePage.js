import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';

function HomePage(){
    const navigate = useNavigate();
    const isAuth = useSelector(state => state.auth.isAuthenticated);
    useEffect(()=>{
        if(isAuth)
        {
          navigate('/Task');
        }
      },[isAuth,navigate])
    return (
        <h1>Welcome To TASK MANAGER</h1>
    )
}

export default HomePage;