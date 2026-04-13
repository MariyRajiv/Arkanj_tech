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
  <CustomIcon src="/uptech.png" alt="UpTech" Fallback={Cpu} className={className} width="100" height="100" />
);

export const FinTechIcon = ({ className }: IconProps) => (
  <CustomIcon src="/fintech.png" alt="FinTech" Fallback={CreditCard} className={className} width="100" height="100" />
);

export const EduTechIcon = ({ className }: IconProps) => (
  <CustomIcon src="/edutech.png" alt="EduTech" Fallback={GraduationCap} className={className} width="100" height="100" />
);

export const DeepTechIcon = ({ className }: IconProps) => (
  <CustomIcon src="/deeptech.png" alt="DeepTech" Fallback={Cpu} className={className} width="100" height="100" />
);

export const MedTechIcon = ({ className }: IconProps) => (
  <CustomIcon src="/bio.png" alt="MedTech" Fallback={Microscope} className={className} width="100" height="100" />
);

export const LaunchTechIcon = ({ className }: IconProps) => (
  <CustomIcon src="/rocket.png" alt="LaunchTech" Fallback={Rocket} className={className} width="100" height="100" />
);
