import React from 'react';
import { SymmetryProps } from '@/types';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { cn } from '@/lib/utils';
import { modes, ShortcutPrefix } from '@/lib/pixcell';
import { ShortCutInfo } from './shortcut-info';

export const Symmetry: React.FC<SymmetryProps> = ({ mode, onModeChange }) => {
  return (
    <ToggleGroup
      variant="outline"
      type="single"
      value={mode}
      onValueChange={onModeChange}
    >
      {modes.map((item, index) => {
        const isSelected = mode === item.mode;
        return (
          <Tooltip key={item.mode}>
            <TooltipTrigger asChild>
              <ToggleGroupItem
                value={item.mode}
                title={item.title}
                className={cn('aspect-square p-1', {
                  'bg-accent': isSelected,
                })}
              >
                <item.icon
                  className={cn({
                    'stroke-blue-600': isSelected,
                  })}
                />
              </ToggleGroupItem>
            </TooltipTrigger>
            <TooltipContent className="capitalize">
              <span className="inline-block mb-1">{item.title}</span>
              <ShortCutInfo item={index + 1} prefix={ShortcutPrefix.Symmetry} />
            </TooltipContent>
          </Tooltip>
        );
      })}
    </ToggleGroup>
  );
};
