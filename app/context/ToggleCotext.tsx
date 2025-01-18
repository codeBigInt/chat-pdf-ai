"use client"
import React, { createContext, useState } from "react";

export interface ToggleContextProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

// Create context with a proper default value that matches ToggleContextProps
export const ToggleContext = createContext<ToggleContextProps>({
    isOpen: false,
    setIsOpen: () => {} // no-op function as default
});

const ToggleContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    
    return (
        <ToggleContext.Provider value={{ isOpen, setIsOpen }}>
            {children}
        </ToggleContext.Provider>
    );
};

export default ToggleContextProvider;