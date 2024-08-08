import { colors, ShortcutPrefix } from '@/lib/pixcell';
import { ColorPickerProps } from '@/types';
import { TooltipContent, Tooltip, TooltipTrigger } from './ui/tooltip';
import { cn } from '@/lib/utils';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { ShortCutInfo } from './shortcut-info';
import { Input } from './ui/input';
import { useEffect, useState } from 'react';

export const ColorPicker: React.FC<ColorPickerProps> = ({
  selectedColor,
  onColorChange,
}) => {
  const [previewColor, setPreviewColor] = useState(selectedColor);
  useEffect(() => {
    setPreviewColor(selectedColor);
  }, [selectedColor]);

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
              <span className="inline-block mb-1">Color #{index + 1}</span>
              <ShortCutInfo item={index + 1} prefix={ShortcutPrefix.Color} />
            </TooltipContent>
          </Tooltip>
        );
      })}
      <Tooltip>
        <TooltipTrigger asChild>
          <ToggleGroupItem
            value={previewColor}
            variant="outline"
            className={cn(
              'rounded-sm cursor-pointer relative ms-1 aspect-square transition-all p-0'
            )}
            style={{ backgroundColor: previewColor }}
          >
            <Input
              type="color"
              value={previewColor}
              className="w-full h-full opacity-0 cursor-pointer"
              onChange={(event) => setPreviewColor(event.target.value)}
              onBlur={(event) =>
                event.target.value && onColorChange(event.target.value)
              }
            />
          </ToggleGroupItem>
        </TooltipTrigger>
        <TooltipContent>
          <span className="inline-block">Pick color</span>
        </TooltipContent>
      </Tooltip>
    </ToggleGroup>
  );
};
