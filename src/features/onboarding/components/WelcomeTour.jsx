import React, { useState, useEffect, useRef } from 'react';
import { Box, Backdrop } from '@mui/material';
import { animated, useSpring } from '@react-spring/web';
import { useTour } from '../context/TourContext';
import SpotlightCard from './SpotlightCard';
import TourStep from './TourStep';

const AnimatedBackdrop = animated(Backdrop);

export default function WelcomeTour() {
  const { 
    isActive, 
    currentStep, 
    steps, 
    nextStep, 
    prevStep, 
    endTour 
  } = useTour();
  
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState({ width: 400, height: 300 });
  const targetRef = useRef(null);
  
  const backdropAnimation = useSpring({
    opacity: isActive ? 1 : 0,
    pointerEvents: isActive ? 'auto' : 'none',
    config: { tension: 200, friction: 30 }
  });

  useEffect(() => {
    if (!isActive || steps.length === 0) return;

    const step = steps[currentStep];
    const targetElement = step.targetSelector 
      ? document.querySelector(step.targetSelector) 
      : null;

    if (targetElement) {
      const rect = targetElement.getBoundingClientRect();
      targetRef.current = targetElement;
      
      // Calculate spotlight position
      const spotlightPadding = 20;
      const spotlightWidth = rect.width + spotlightPadding * 2;
      const spotlightHeight = rect.height + spotlightPadding * 2;
      
      setPosition({
        x: rect.left - spotlightPadding,
        y: rect.top - spotlightPadding
      });
      
      setSize({
        width: spotlightWidth,
        height: spotlightHeight
      });
    } else {
      // Center in viewport if no target
      setPosition({
        x: window.innerWidth / 2 - 200,
        y: window.innerHeight / 2 - 150
      });
      
      setSize({
        width: 400,
        height: 300
      });
    }
  }, [isActive, currentStep, steps]);

  if (!isActive || steps.length === 0) return null;

  const currentStepData = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      endTour();
    } else {
      nextStep();
    }
  };

  const handlePrimaryAction = () => {
    if (currentStepData.primaryAction?.action) {
      currentStepData.primaryAction.action();
    }
    handleNext();
  };

  return (
    <>
      <AnimatedBackdrop
        style={backdropAnimation}
        open={isActive}
        sx={{ 
          zIndex: 1299,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          backdropFilter: 'blur(4px)'
        }}
      />
      
      <SpotlightCard position={position} size={size}>
        <TourStep 
          step={currentStepData}
          currentStep={currentStep}
          totalSteps={steps.length}
          onNext={handlePrimaryAction}
          onPrev={prevStep}
          onClose={endTour}
        />
      </SpotlightCard>
    </>
  );
}