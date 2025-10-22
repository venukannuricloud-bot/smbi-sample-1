import logoImage from '@assets/generated_images/SBMI_logo_design_97004d68.png';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({ className = '', size = 'md' }: LogoProps) {
  const sizes = {
    sm: 'h-6',
    md: 'h-8',
    lg: 'h-12'
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <img src={logoImage} alt="SBMI Logo" className={sizes[size]} />
      <span className="font-semibold text-lg text-foreground">SBMI</span>
    </div>
  );
}
