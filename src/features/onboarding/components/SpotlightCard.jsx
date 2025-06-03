import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { animated, useSpring } from '@react-spring/web';

const AnimatedPaper = animated(Paper);

export default function SpotlightCard({ children, position, size }) {
    const animation = useSpring({
        from: { opacity: 0, transform: 'scale(0.9)' },
        to: { opacity: 1, transform: 'scale(1' },
        config: { tension: 300, friction: 20 }
    });

    return (
        <AnimatedPaper
            elevation={6}
            style={{
                ...animation,
                position: 'absolute',
                top: position.y,
                left: position.x,
                width: size.width,
                height: size.height,
                zIndex: 1300,
                borderRadius: 12,
                overflow: 'hidden'
            }}
        >
            {children}
        </AnimatedPaper>
    );
}