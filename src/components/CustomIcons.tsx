import React from 'react';
import { CreditCard, GraduationCap, Microscope, Rocket, Cpu } from 'lucide-react';

interface IconProps {
  className?: string;
}

const CustomIcon = ({ src, alt, Fallback, className, width = "64", height = "64", loading = "lazy" }: { 
  src: string, 
  alt: string, 
  Fallback: React.ElementType, 
  className?: string,
  width?: string,
  height?: string,
  loading?: "lazy" | "eager"
}) => {
  const [error, setError] = React.useState(false);

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    if (e.currentTarget.naturalWidth === 0) {
      setError(true);
    }
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      {!error ? (
        <img 
          src={src} 
          alt={alt} 
          width={width}
          height={height}
          loading={loading}
          className="w-full h-full object-contain transition-opacity duration-300" 
          onLoad={handleLoad}
          onError={() => setError(true)}
          referrerPolicy="no-referrer"
        />
      ) : (
        <Fallback className="w-full h-full animate-in fade-in duration-500" />
      )}
    </div>
  );
};

export const UpTechIcon = ({ className }: IconProps) => (
  <div className={className}><Cpu className="w-full h-full" /></div>
);

export const FinTechIcon = ({ className }: IconProps) => (
  <div className={className}><CreditCard className="w-full h-full" /></div>
);

export const EduTechIcon = ({ className }: IconProps) => (
  <div className={className}><GraduationCap className="w-full h-full" /></div>
);

export const DeepTechIcon = ({ className }: IconProps) => (
  <div className={className}><Cpu className="w-full h-full" /></div>
);

export const MedTechIcon = ({ className }: IconProps) => (
  <div className={className}><Microscope className="w-full h-full" /></div>
);

export const LaunchTechIcon = ({ className }: IconProps) => (
  <div className={className}><Rocket className="w-full h-full" /></div>
);
