import React, { useEffect } from 'react';

interface AdUnitProps {
  slotId: string;
  className?: string;
}

const AdUnit: React.FC<AdUnitProps> = ({ slotId, className = '' }) => {
  useEffect(() => {
    try {
      // @ts-ignore
      if (window.adsbygoogle) {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) {
      console.error("AdSense error", e);
    }
  }, []);

  return (
    <div className={`w-full overflow-hidden my-4 flex justify-center items-center bg-gray-100 border border-gray-200 rounded-lg min-h-[80px] ${className}`}>
      <div className="absolute text-xs text-gray-400 font-mono text-center p-2">
        AD SPACE (Use AdMob for Store)
      </div>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', width: '100%' }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" 
        data-ad-slot={slotId}
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

export default AdUnit;