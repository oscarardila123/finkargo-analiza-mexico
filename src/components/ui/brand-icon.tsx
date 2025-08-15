import React from 'react'
import { cn } from '@/lib/utils'

interface BrandIconProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const sizeClasses = {
  sm: 'w-6 h-6',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
  xl: 'w-16 h-16'
}

const dotSizes = {
  sm: 'w-2 h-2',
  md: 'w-3 h-3',
  lg: 'w-4 h-4',
  xl: 'w-6 h-6'
}

const rayThickness = {
  sm: '2px',
  md: '3px',
  lg: '4px',
  xl: '6px'
}

export function BrandIcon({ size = 'md', className }: BrandIconProps) {
  const containerClass = sizeClasses[size]
  const dotClass = dotSizes[size]
  const thickness = rayThickness[size]
  
  return (
    <div className={cn('relative flex items-center justify-center', containerClass, className)}>
      {/* Central coral dot */}
      <div className={cn('absolute bg-brand-coral rounded-full z-10', dotClass)} />
      
      {/* Cyan rays */}
      <svg 
        className="absolute inset-0 w-full h-full" 
        viewBox="0 0 32 32" 
        fill="none"
      >
        {/* Top ray */}
        <rect x="15" y="2" width={thickness} height="8" fill="hsl(var(--secondary))" rx="1" />
        {/* Bottom ray */}
        <rect x="15" y="22" width={thickness} height="8" fill="hsl(var(--secondary))" rx="1" />
        {/* Left ray */}
        <rect x="2" y="15" width="8" height={thickness} fill="hsl(var(--secondary))" rx="1" />
        {/* Right ray */}
        <rect x="22" y="15" width="8" height={thickness} fill="hsl(var(--secondary))" rx="1" />
        
        {/* Diagonal rays */}
        <rect 
          x="6.5" 
          y="6.5" 
          width="6" 
          height={thickness} 
          fill="hsl(var(--secondary))" 
          rx="1"
          transform="rotate(45 9.5 8.5)" 
        />
        <rect 
          x="19.5" 
          y="6.5" 
          width="6" 
          height={thickness} 
          fill="hsl(var(--secondary))" 
          rx="1"
          transform="rotate(-45 22.5 8.5)" 
        />
        <rect 
          x="6.5" 
          y="19.5" 
          width="6" 
          height={thickness} 
          fill="hsl(var(--secondary))" 
          rx="1"
          transform="rotate(-45 9.5 23.5)" 
        />
        <rect 
          x="19.5" 
          y="19.5" 
          width="6" 
          height={thickness} 
          fill="hsl(var(--secondary))" 
          rx="1"
          transform="rotate(45 22.5 23.5)" 
        />
      </svg>
    </div>
  )
}

export default BrandIcon