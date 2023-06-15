import React, { useState, useEffect } from 'react';
import './landingPage.css';

const LandingPage = () => {
  const [percentage, setPercentage] = useState(0);
  const [isLoadingComplete, setIsLoadingComplete] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isBlurEnabled, setIsBlurEnabled] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setPercentage(prevPercentage => {
        const newPercentage = prevPercentage + 1;
        if (newPercentage > 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsLoadingComplete(true);
          });
          return 0;
        }
        return newPercentage;
      });
    }, 30);

    const handleLoad = () => {
      clearInterval(timer);
      setTimeout(() => {
        setIsLoadingComplete(true);
        setIsInitialLoad(false);
        setTimeout(() => {
          setIsLoadingComplete(false);
          setIsBlurEnabled(false); // Deaktiver sløring efter "Indlæsning fuldført!" forsvinder
        }, 1000); // Fjern teksten "Indlæsning fuldført!" efter 1 sekund
      }, 1000); // Vis "Indlæsning fuldført!" i 1 sekund
    };

    window.addEventListener('load', handleLoad);

    return () => {
      clearInterval(timer);
      window.removeEventListener('load', handleLoad); 
    };
  }, []);

  useEffect(() => {
    const blurredElement = document.getElementById('blurred');
    blurredElement.style.filter = isBlurEnabled ? 'blur(5px)' : 'none';
  }, [isBlurEnabled]);

  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div id="blurred" className="content">
        {isLoadingComplete ? (
          <h1>Indlæsning fuldført!</h1>
        ) : (
          <div className={`loader ${isInitialLoad ? '' : 'hidden'}`}>
            <div className="loader-content">
              <div className="percentage">{percentage}%</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default LandingPage;
