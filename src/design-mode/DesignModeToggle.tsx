// DesignModeToggle: Button to enable/disable design mode (dev only)
import React from 'react';
import { useDesignMode } from './DesignModeContext';

const DesignModeToggle: React.FC = () => {
  const { enabled, setEnabled } = useDesignMode();

  if (process.env.NODE_ENV !== 'development') return null;

  return (
    <button
      style={{
        position: 'fixed',
        top: 16,
        right: 16,
        zIndex: 9999,
        background: enabled ? '#facc15' : '#222',
        color: enabled ? '#222' : '#fff',
        border: 'none',
        borderRadius: 8,
        padding: '8px 16px',
        fontWeight: 700,
        cursor: 'pointer',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
      }}
      onClick={() => setEnabled(!enabled)}
    >
      {enabled ? 'Exit Design Mode' : 'Enter Design Mode'}
    </button>
  );
};

export default DesignModeToggle;
