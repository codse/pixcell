import React, { useState } from 'react';
import { GridSize, Pixel, ShapeType, SymmetryMode } from '@/types';
import {
  getSymmetryPoints,
  shapeTypes,
  colors,
  ShortcutPrefix,
} from '@/lib/pixcell';
import { Symmetry } from '@/components/symmetry';
import { Shape } from '@/components/shape';
import { CanvasGrid } from '@/components/canvas-grid';
import { ExportButton } from '@/components/export-button';
import { ColorPicker } from '@/components/color-picker';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import { Toaster } from '@/components/ui/sonner';
import { ControlsContainer } from '@/components/controls-container';
import TypingText from '@/components/animata/text/typing-text';
import BoldCopy from '@/components/animata/text/bold-copy';
import { useShortCut } from '@/hooks/use-shortcut';
import { toast } from 'sonner';
import { modes } from '@/components/modes';

const PixCell: React.FC = () => {
  const [gridSize] = useState<GridSize>({ width: 24, height: 24 });
  const [selectedColor, setSelectedColor] = useState<string>('#000000');
  const [pixels, setPixels] = useState<Pixel[]>([]);
  const [selectedShape, setSelectedShape] = useState<ShapeType>('square');
  const [symmetryMode, setSymmetryMode] = useState<SymmetryMode>('none');

  const handlePixelClick = (x: number, y: number): void => {
    setPixels((prevPixels) => {
      const newPixels = [...prevPixels];
      const symmetryPoints = getSymmetryPoints(x, y, gridSize, symmetryMode);

      symmetryPoints.forEach((point) => {
        const index = newPixels.findIndex(
          (p) => p.x === point.x && p.y === point.y
        );
        if (index === -1) {
          newPixels.push({
            x: point.x,
            y: point.y,
            color: selectedColor,
            shape: selectedShape,
          });
        } else {
          newPixels.splice(index, 1);
        }
      });

      return newPixels;
    });
  };

  const handleClear = (): void => {
    setPixels([]);
  };

  const handleShortCut = ({
    currentKey,
    prefix,
  }: {
    currentKey: string;
    prefix: string | null;
  }) => {
    if (!prefix || isNaN(+currentKey)) {
      return;
    }

    const position = +currentKey - 1;

    if (prefix === ShortcutPrefix.Color && position < colors.length) {
      setSelectedColor(colors[position]);
      return;
    }

    if (prefix === ShortcutPrefix.Shape && position < shapeTypes.length) {
      setSelectedShape(shapeTypes[position]);
      return;
    }

    if (prefix === ShortcutPrefix.Symmetry && position < modes.length) {
      setSymmetryMode(modes[position].mode);
      return;
    }

    toast(`${prefix} + ${currentKey} is not a registered.`);
  };

  useShortCut({
    timeout: 500,
    onShortCut: handleShortCut,
  });

  return (
    <div className="container flex max-w-xl gap-4 flex-col justify-center p-8">
      <header>
        <h1>
          <BoldCopy
            text="PixCell"
            className="p-0 leading-none md:p-0"
            textClassName="text-xl md:text-2xl group-hover:md:text-6xl"
            backgroundTextClassName="text-4xl  md:text-6xl"
          />
        </h1>
        <TypingText
          text="A pixel art creator made for fun."
          grow={false}
          smooth
          className="text-center text-balance mb-12 text-muted-foreground"
          repeat={false}
        />
      </header>
      <div className="flex flex-col gap-4 duration-1000 animate-in fade-in-0 slide-in-from-bottom-10">
        <div className="flex gap-4 flex-col sm:flex-row justify-between">
          <ControlsContainer title="Mirror">
            <Symmetry mode={symmetryMode} onModeChange={setSymmetryMode} />
          </ControlsContainer>
          <ControlsContainer title="Shape">
            <div className="flex flex-row gap-2">
              {shapeTypes.map((shape) => (
                <Shape
                  key={shape}
                  type={shape}
                  isSelected={selectedShape === shape}
                  onClick={() => setSelectedShape(shape)}
                />
              ))}
            </div>
          </ControlsContainer>
        </div>
        <ControlsContainer title="Color">
          <ColorPicker
            selectedColor={selectedColor}
            onColorChange={setSelectedColor}
          />
        </ControlsContainer>
        <CanvasGrid
          width={gridSize.width}
          height={gridSize.height}
          pixels={pixels}
          onPixelClick={handlePixelClick}
          currentShape={selectedShape}
          currentColor={selectedColor}
        />
        <div className="flex justify-between">
          <Button
            onClick={handleClear}
            variant="destructive"
            className="gap-2  "
          >
            <Trash className="size-4" />
            Clear
          </Button>
          <ExportButton pixels={pixels} gridSize={gridSize} />
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default PixCell;
