import React from 'react';
import { cn } from '@/lib/utils';
import { ShapeProps } from '@/types';
import { getClipPath, ShortcutPrefix } from '@/lib/pixcell';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { ToggleGroupItem } from './ui/toggle-group';
import { Button } from './ui/button';
import { ShortCutInfo } from './shortcut-info';

const Container = ({
  children,
  tooltip,
}: {
  tooltip?: React.ReactNode;
  children: React.ReactNode;
}) => {
  if (!tooltip) {
    return children;
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent>{tooltip}</TooltipContent>
    </Tooltip>
  );
};

export const Shape: React.FC<ShapeProps> = ({
  type,
  isSelected,
  className,
  color,
  shortcutIndex,
}) => {
  return (
    <Container
      tooltip={
        <div className="capitalize">
          <span className="inline-block mb-1">{type}</span>
          <ShortCutInfo
            item={String(shortcutIndex)}
            prefix={ShortcutPrefix.Shape}
          />
        </div>
      }
    >
      <ToggleGroupItem
        className={cn('aspect-square p-1', className)}
        title={type}
        value={type}
      >
        <span
          className={cn(
            'w-full h-full aspect-square inline-block bg-gray-500 hover:bg-blue-500/90 active:bg-blue-500/80 transition-colors duration-100 ease-in-out',
            {
              'bg-blue-500': isSelected && !color,
            }
          )}
          style={{
            backgroundColor: color,
            clipPath: getClipPath(type),
          }}
        />
      </ToggleGroupItem>
    </Container>
  );
};

export const ShapeCursor: React.FC<ShapeProps> = ({
  type,
  isSelected,
  className,
  color,
  style,
}) => {
  return (
    <Container>
      <Button
        className={className}
        title={type}
        size="icon"
        variant="outline"
        style={style}
      >
        <span
          className={cn(
            'w-full h-full aspect-square inline-block bg-gray-500 hover:bg-blue-500/90 active:bg-blue-500/80 transition-colors duration-100 ease-in-out',
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
    </Container>
  );
};
