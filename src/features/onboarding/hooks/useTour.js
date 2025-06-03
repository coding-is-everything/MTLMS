import { useEffect } from 'react';
import { useTour } from '../context/TourContext';

export default function useWelcomeTour(steps) {
    const { startTour, isActive, completed } = useTour();

    useEffect(() => {
        const hasCompletedTour = localStorage.getItem('tourCompleted');

        if (!hasCompletedTour && !isActive && !completed) {
            setTimeout(() => {
                startTour(steps);
            }, 2000);
        }
    }, [startTour, isActive, completed, steps]);

    const completeTour = () => {
        localStorage.setItem('tourCompleted', 'true');
    };

    return { completeTour };
}