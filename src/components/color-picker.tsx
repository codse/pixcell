import { colors } from '@/lib/pixcell';
import { ColorPickerProps } from '@/types';
import { TooltipContent, Tooltip, TooltipTrigger } from './ui/tooltip';
import { cn } from '@/lib/utils';
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group';

export const ColorPicker: React.FC<ColorPickerProps> = ({
  selectedColor,
  onColorChange,
}) => {
  return (
    <ToggleGroup
      type="single"
      value={selectedColor}
      variant="outline"
      onValueChange={onColorChange}
      className="drop-shadow-sm"
    >
      {colors.map((color, index) => {
        const isSelected = selectedColor === color;
        return (
          <Tooltip key={color}>
            <TooltipTrigger asChild>
              <ToggleGroupItem
                value={color}
                variant="outline"
                className={cn(
                  'rounded-full p-1 aspect-square transition-all hover:p-0',
                  {
                    'p-0': isSelected,
                  }
                )}
              >
                <span
                  className={cn('w-full h-full rounded-full')}
                  style={{ backgroundColor: color }}
                />
              </ToggleGroupItem>
            </TooltipTrigger>
            <TooltipContent>
              Color #{index + 1}
              <span className="text-xs block">c + {index + 1}</span>
            </TooltipContent>
          </Tooltip>
        );
      })}
    </ToggleGroup>
  );
};
