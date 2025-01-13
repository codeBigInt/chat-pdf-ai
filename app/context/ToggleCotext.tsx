"use client"
import React, { createContext, useState } from "react";

export interface ToggleContextProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

export const ToggleContext = createContext<ToggleContextProps | {}>({})


const ToggleContextProvider = ({ children }: {children: React.ReactNode}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    return (
        <ToggleContext.Provider value={{ isOpen, setIsOpen }}>
            {children}
        </ToggleContext.Provider>
    );
};

export default ToggleContextProvider;