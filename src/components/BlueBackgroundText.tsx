import React from 'react';

interface BlueBackgroundTextProps {
  children: React.ReactNode;
  className?: string;
  forceWhiteText?: boolean;
}

export const BlueBackgroundText: React.FC<BlueBackgroundTextProps> = ({ 
  children, 
  className = '',
  forceWhiteText = true 
}) => {
  const whiteTextStyles = {
    color: '#ffffff !important',
    // Override any conflicting Tailwind classes
    '--tw-text-opacity': '1',
  } as React.CSSProperties;

  return (
    <div 
      className={className}
      style={forceWhiteText ? whiteTextStyles : undefined}
    >
      {children}
    </div>
  );
};

// Usage example:
// <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-black">
//   <BlueBackgroundText>
//     <h3>This text will be white</h3>
//     <p>This text will also be white</p>
//   </BlueBackgroundText>
// </div>