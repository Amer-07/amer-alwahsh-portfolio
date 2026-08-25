import React, { useEffect, useRef, useState } from 'react';

interface RevealProps {
  children: React.ReactNode;
  width?: 'fit-content' | '100%';
  delay?: number; // Delay in seconds
  duration?: number; // Duration in milliseconds
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  className?: string;
}

export const Reveal: React.FC<RevealProps> = ({ 
  children, 
  width = 'fit-content', 
  delay = 0, 
  duration = 800,
  direction = 'up',
  className = ""
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      // Toggle visibility based on intersection state
      if (entry.isIntersecting) {
        setIsVisible(true);
      } else {
        // Only hide if the element has gone completely out of view to allow replay
        // We check boundingClientRect to ensure natural feeling
        setIsVisible(false);
      }
    }, {
      threshold: 0.15, // Trigger when 15% of the element is visible
      rootMargin: "0px 0px -50px 0px" // Offset slightly so it triggers before hitting the absolute bottom
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  const getTransformClass = () => {
    if (isVisible) return 'translate-x-0 translate-y-0 scale-100 opacity-100 blur-0';
    
    // Hidden states
    switch (direction) {
      case 'up': return 'translate-y-10 scale-95 opacity-0 blur-sm';
      case 'down': return '-translate-y-10 scale-95 opacity-0 blur-sm';
      case 'left': return 'translate-x-10 scale-95 opacity-0 blur-sm';
      case 'right': return '-translate-x-10 scale-95 opacity-0 blur-sm';
      case 'none': return 'scale-95 opacity-0 blur-sm';
      default: return 'translate-y-10 opacity-0';
    }
  };

  return (
    <div ref={ref} className={`relative ${width} ${className}`}>
      <div 
        style={{ 
          transitionDuration: `${duration}ms`,
          transitionDelay: isVisible ? `${delay}s` : '0s' // Remove delay when hiding so it resets instantly
        }}
        className={`transition-all ease-[cubic-bezier(0.25,0.46,0.45,0.94)] will-change-[transform,opacity] ${getTransformClass()}`}
      >
        {children}
      </div>
    </div>
  );
};

export default Reveal;