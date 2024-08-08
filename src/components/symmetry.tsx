import React from 'react';
import { SymmetryProps } from '@/types';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import { modes } from './modes';
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group';

export const Symmetry: React.FC<SymmetryProps> = ({ mode, onModeChange }) => {
  return (
    <ToggleGroup type="single" value={mode} onValueChange={onModeChange}>
      {modes.map((item) => {
        return (
          <Tooltip key={item.mode}>
            <TooltipTrigger asChild>
              <ToggleGroupItem
                variant="outline"
                value={item.mode}
                title={item.title}
                className="aspect-square p-1"
              >
                {item.icon}
              </ToggleGroupItem>
            </TooltipTrigger>
            <TooltipContent>{item.title}</TooltipContent>
          </Tooltip>
        );
      })}
    </ToggleGroup>
  );
};
