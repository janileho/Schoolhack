import React from 'react';

interface DevModeBannerProps {
  isActive: boolean;
  onSkipToCombat: () => void;
}

const DevModeBanner: React.FC<DevModeBannerProps> = ({ isActive, onSkipToCombat }) => {
  if (!isActive) return null;
  
  return (
    <div className="mb-4 p-2 border border-yellow-500 text-center bg-yellow-100">
      <div className="flex justify-between items-center">
        <span className="font-bold">Developer Mode Active</span>
        <button 
          onClick={onSkipToCombat}
          className="retro-button bg-yellow-500 hover:bg-yellow-600 text-sm py-1 px-2"
        >
          Skip to Combat
        </button>
      </div>
    </div>
  );
};

export default DevModeBanner; 