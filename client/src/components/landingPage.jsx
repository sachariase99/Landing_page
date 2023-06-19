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
        if (newPercentage >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsLoadingComplete(true);
            setIsInitialLoad(false);
            setIsBlurEnabled(false); // Disable blur after "Loading complete!" disappears
          }, 1000); // Remove the "Loading complete!" text after 1 second
          return 100; // Set percentage to 100
        } else {
          return newPercentage;
        }
      });
    }, 30);

    const handleLoad = () => {
      clearInterval(timer);
      setTimeout(() => {
        setIsLoadingComplete(true);
        setIsInitialLoad(false);
        setTimeout(() => {
          setIsLoadingComplete(false);
          setIsBlurEnabled(false); // Disable blur after "Loading complete!" disappears
        }, 1000); // Remove the "Loading complete!" text after 1 second
      }, 1000); // Show "Loading complete!" for 1 second
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
          <h1 className="uppercase font-bold text-6xl text-green-500 text-center">Loading complete!</h1>
        ) : (
          <div className={`loader ${isInitialLoad ? '' : 'hidden'}`}>
            <div className="loader-content">
              <div className="circle-loader">
                <div className="circle-border"></div>
                <div
                  className="circle-fill"
                  style={{ clipPath: `inset(0 ${100 - percentage}% 0 0)` }} // Adjust clip-path based on percentage
                ></div>
                <div className="circle-content">{percentage}%</div>
              </div>
              {!isInitialLoad && (
                <div className="progress-bar-container">
                  <div className="progress-bar-fill" style={{ width: `${percentage}%` }}></div>
                  <div className="progress-bar-content">{percentage}%</div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default LandingPage;
