import React from 'react';
import { cn } from '@/lib/utils';
import { ShapeProps } from '@/types';
import { getClipPath } from '@/lib/pixie';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';

export const Shape: React.FC<ShapeProps> = ({
  type,
  isSelected,
  onClick,
  className,
  color,
}) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          className={className}
          onClick={onClick}
          title={type}
          size="icon"
          variant="outline"
        >
          <span
            className={cn(
              'size-6 aspect-square inline-block bg-gray-500 hover:bg-blue-500/90 active:bg-blue-500/80 transition-colors duration-100 ease-in-out',
              {
                'bg-blue-500': isSelected && !color,
              }
            )}
            style={{
              backgroundColor: color,
              clipPath: getClipPath(type),
            }}
          />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p className="capitalize">{type}</p>
      </TooltipContent>
    </Tooltip>
  );
};
