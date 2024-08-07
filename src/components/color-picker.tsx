import { colors } from '@/lib/pixie';
import { ColorPickerProps } from '@/types';
import { Button } from '@/components/ui/button';
import { TooltipContent, Tooltip, TooltipTrigger } from './ui/tooltip';
import { cn } from '@/lib/utils';

export const ColorPicker: React.FC<ColorPickerProps> = ({
  selectedColor,
  onColorChange,
}) => {
  return (
    <div className="flex gap-1 flex-wrap drop-shadow-sm">
      {colors.map((color, index) => {
        const isSelected = selectedColor === color;
        return (
          <Tooltip key={color}>
            <TooltipTrigger asChild>
              <Button
                onClick={() => onColorChange(color)}
                variant="outline"
                size="icon"
                className={cn(
                  'size-9 rounded-full aspect-square transition-all',
                  {
                    border: isSelected,
                  }
                )}
                style={{
                  borderColor: isSelected ? color : undefined,
                }}
              >
                <span
                  className={cn(
                    'size-7 rounded-full aspect-square hover:size-9 transition-all  ',
                    {
                      'size-9': isSelected,
                    }
                  )}
                  style={{ backgroundColor: color }}
                />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              Color #{index + 1}
              <span className="text-xs block">Press CMD + ${index + 1}</span>
            </TooltipContent>
          </Tooltip>
        );
      })}
    </div>
  );
};
