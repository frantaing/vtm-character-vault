import { createContext, useState, useContext } from 'react';

const BreadcrumbContext = createContext();

// custom hook to make it easier to use this context
export const useBreadcrumbs = () => useContext(BreadcrumbContext);

export const BreadcrumbProvider = ({ children }) => {
    // store mappings of paths to their proper names
    // --> { "/brujah/alexandra": "Alexandra Voss" }
    const [crumbNames, setCrumbNames] = useState({});

    // called from other components to set a name
    const setCrumbName = (path, name) => {
        setCrumbNames(prev => ({ ...prev, [path]: name }));
    };

    const value = { crumbNames, setCrumbName };

    return (
        <BreadcrumbContext.Provider value={value}>
            {children}
        </BreadcrumbContext.Provider>
    );
};