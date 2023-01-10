import { createContext, useEffect } from 'react';
import { useState } from 'react';

const NavigationContext = createContext();

function NavigationProvider({children}) {

    const [currentPath, setCurrentPath] = useState(window.location.pathname);

    //This is used for when user click baxk/forward button 'popstate' specfically is an event for this
    useEffect(() => {
        
        const handler = () => {

            setCurrentPath(window.location.pathname);
        };
        window.addEventListener('popstate', handler);

        return () => {
            window.removeEventListener('popstate', handler);
        };
    }, []);

    const navigate = (to) => {

        window.history.pushState({}, '', to);
        setCurrentPath(to);
    };

    return <NavigationContext.Provider value={{ currentPath, navigate }}>
        {children}
    </NavigationContext.Provider>
}

export { NavigationProvider };
export default NavigationContext;