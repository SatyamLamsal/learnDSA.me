// Entry point to inject design mode in dev
'use client';
import React, { useEffect } from 'react';
import { DesignModeProvider } from './DesignModeContext';
import DesignModeToggle from './DesignModeToggle';
import DesignModePicker from './DesignModePicker';
import { applySavedDesignModeStyles } from './applySavedStyles';

const DesignModeRoot: React.FC = () => {
  useEffect(() => {
    applySavedDesignModeStyles();
  }, []);
  if (process.env.NODE_ENV !== 'development') return null;
  return (
    <DesignModeProvider>
      <DesignModeToggle />
      <DesignModePicker />
    </DesignModeProvider>
  );
};

export default DesignModeRoot;
