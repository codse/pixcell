import { gridSizes, ShortcutPrefix } from '@/lib/pixcell';
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import { ShortCutInfo } from './shortcut-info';
import { cn } from '@/lib/utils';

export const GridDensityPicker = ({
  gridSize,
  setGridSize,
}: {
  gridSize: { width: number; height: number };
  setGridSize: (gridSize: { width: number; height: number }) => void;
}) => {
  return (
    <ToggleGroup
      type="single"
      variant="outline"
      value={gridSize.width.toString()}
      onValueChange={(value) => {
        setGridSize({ height: +value, width: +value });
      }}
    >
      {gridSizes.map((size, index) => {
        const isSelected = size === gridSize.width;
        return (
          <Tooltip key={size}>
            <TooltipTrigger asChild>
              <ToggleGroupItem
                className={cn('aspect-square', {
                  'bg-accent text-blue-600': isSelected,
                })}
                value={size.toString()}
              >
                {size}
              </ToggleGroupItem>
            </TooltipTrigger>
            <TooltipContent>
              <ShortCutInfo prefix={ShortcutPrefix.GridSize} item={index + 1} />
            </TooltipContent>
          </Tooltip>
        );
      })}
    </ToggleGroup>
  );
};
