/**
 * @file useWindowDimensions
 * 
 * A custom React hook to track and update the dimensions of the window.
 * It provides the current width and height of the window as an object.
 */

import { useState, useEffect } from 'react';

const getWindowDimensions = () => {
    let width;
    let height;

    if (typeof window !== 'undefined') {
        width = window.innerWidth;
    }

    if (typeof window !== 'undefined') {
        height = window.innerHeight;
    }

    return { width, height };
};

const useWindowDimensions = () => {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    function handleResize() {
        setWindowDimensions(getWindowDimensions());
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [windowDimensions.width, windowDimensions.height]);

    return windowDimensions;
};

export default useWindowDimensions;
