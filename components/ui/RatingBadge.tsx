import React from 'react';
import { cn } from '@/lib/utils';

interface RatingBadgeProps {
  rating: 'hot' | 'warm' | 'cold';
  className?: string;
}

const RatingBadge = ({ rating, className }: RatingBadgeProps) => {
  const styles = {
    hot: "bg-danger-light/10 text-danger-main border-danger-main/20",
    warm: "bg-warning-light/10 text-warning-main border-warning-main/20",
    cold: "bg-brand-400/10 text-brand-400 border-brand-400/20"
  };
  
  const labels = {
    hot: "Quente",
    warm: "Morno",
    cold: "Frio"
  };

  return (
    <span className={cn("px-2.5 py-1 rounded-lg text-[10px] font-bold border uppercase tracking-wider inline-flex items-center gap-1", styles[rating], className)}>
      {rating === 'hot' && <span className="w-1 h-1 rounded-full bg-danger-main animate-pulse" />}
      {labels[rating]}
    </span>
  );
};

export default RatingBadge;
