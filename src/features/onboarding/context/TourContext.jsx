import React, { createContext, useState, useContext } from 'react';

const TourContext = createContext();

export const TourProvider = ({ children }) => {
    const [tourState, setTourState] = useState({
        isActive: false,
        currentStep: 0,
        completed: false,
        steps: []
    });

    const startTour = (steps) => {
        setTourState({
            isActive: true,
            currentStep: 0,
            completed: false,
            steps
        });
    };

    const nextStep = () => {
        setTourState(prev => {
            const nextStep = prev.currentStep + 1;
            const completed = nextStep >= prev.steps.length;

            return {
                ...prev,
                currentStep: completed ? prev.steps.length - 1 : nextStep,
                completed
            };
        });
    };

    const prevStep = () => {
        setTourState(prev => ({
            ...prev,
            currentStep: Math.max(0, prev.currentStep - 1)
        }));
    };

    const endTour = () => {
        setTourState(prev => ({
            ...prev,
            isActive: false,
            completed: true
        }));
    };

    return (
        <TourContext.Provider
            value={{
                ...tourState,
                startTour,
                nextStep,
                prevStep,
                endTour
            }}
        >
            {children}
        </TourContext.Provider>
    );
};

export const useTour = () => useContext(TourContext);