import React from 'react';
import { SymmetryProps } from '@/types';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import { cn } from '@/lib/utils';
import { modes } from './modes';

export const Symmetry: React.FC<SymmetryProps> = ({ mode, onModeChange }) => {
  return (
    <div className="flex space-x-2">
      {modes.map((item) => {
        return (
          <Tooltip key={item.mode}>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                variant="outline"
                onClick={() => onModeChange(item.mode)}
                className={cn(
                  `rounded p-2 active:bg-blue-600/80 active:text-white hover:bg-blue-600/90 hover:text-white transition-colors duration-100 ease-in-out`,
                  {
                    'bg-blue-600 text-white': item.mode === mode,
                  }
                )}
                title={item.title}
              >
                {item.icon}
              </Button>
            </TooltipTrigger>
            <TooltipContent>{item.title}</TooltipContent>
          </Tooltip>
        );
      })}
    </div>
  );
};
