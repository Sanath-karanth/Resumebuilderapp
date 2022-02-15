import React from 'react';
import Lottie from 'lottie-react-web'
import animation  from '../lotties/79225-know-your-policy.json'
import '../css/lottiestyle.css';
import { useNavigate  } from "react-router-dom";

const SplashScreen = () => {

    const navigate = useNavigate();

    React.useEffect(() => {
        const timer = window.setInterval(() => {
          navigate("/home", { replace: true });
        }, 2000);
        return () => { 
          window.clearInterval(timer);
        };
      }, [navigate]); 

    return (
        <div className="AppLottie">
            <header className="AppLottie-header">
        
            <Lottie
                height={400} 
                width={400}
                options={{
                animationData: animation
                }}
            />
            </header>
      </div>
    );
}

export default SplashScreen;