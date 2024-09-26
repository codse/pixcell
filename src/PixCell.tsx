import React, { useState, useRef } from 'react';
import { GridSize, Pixel, ShapeType, SymmetryMode } from '@/types';
import {
  getSymmetryPoints,
  shapeTypes,
  colors,
  ShortcutPrefix,
  gridSizes,
  modes,
  previewImages,
} from '@/lib/pixcell';
import { Symmetry } from '@/components/symmetry';
import { Shape } from '@/components/shape';
import { CanvasGrid } from '@/components/canvas-grid';
import { ExportButton } from '@/components/export-button';
import { ColorPicker } from '@/components/color-picker';
import { Button } from '@/components/ui/button';
import { Trash, Undo, Redo } from 'lucide-react';
import { Toaster } from '@/components/ui/sonner';
import { ControlsContainer } from '@/components/controls-container';
import TypingText from '@/components/animata/text/typing-text';
import BoldCopy from '@/components/animata/text/bold-copy';
import { useShortCut } from '@/hooks/use-shortcut';
import { toast } from 'sonner';
import { ToggleGroup } from '@/components/ui/toggle-group';
import { GridDensityPicker } from '@/components/grid-density';
import { ImageUpload } from '@/components/image-upload';
import Marquee from '@/components/animata/container/marquee';

const PixCell: React.FC = () => {
  const [gridSize, setGridSize] = useState<GridSize>({ width: 24, height: 24 });
  const [selectedColor, setSelectedColor] = useState<string>('#000000');
  const [pixels, setPixels] = useState<Pixel[]>([]);
  const [selectedShape, setSelectedShape] = useState<ShapeType>('square');
  const [symmetryMode, setSymmetryMode] = useState<SymmetryMode>('none');
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);
  const history = useRef<Pixel[][]>([]);
  const redoHistory = useRef<Pixel[][]>([]);
  const currentClickPixels = useRef<Pixel[]>([]);

  const handlePixelClick = (
    x: number,
    y: number,
    updates?: Partial<Pick<Pixel, 'color' | 'shape'>>
  ): void => {
    setPixels((prevPixels) => {
      const newPixels = [...prevPixels];
      const symmetryPoints = getSymmetryPoints(x, y, gridSize, symmetryMode);

      symmetryPoints.forEach((point) => {
        const index = newPixels.findIndex(
          (p) => p.x === point.x && p.y === point.y
        );
        if (index === -1) {
          const newPixel = {
            x: point.x,
            y: point.y,
            color: selectedColor,
            shape: selectedShape,
          };
          newPixels.push(newPixel);
          currentClickPixels.current.push(newPixel);
        } else if (updates) {
          newPixels[index] = {
            ...newPixels[index],
            ...updates,
          };
          currentClickPixels.current.push(newPixels[index]);
        } else {
          currentClickPixels.current.push(newPixels[index]);
          newPixels.splice(index, 1);
        }
      });

      return newPixels;
    });
  };

  const handleMouseUp = (): void => {
    if (currentClickPixels.current.length > 0) {
      history.current.push([...currentClickPixels.current]);
      currentClickPixels.current = [];
      redoHistory.current = []; // Clear redo history on new action
    }
  };

  const handleClear = (): void => {
    history.current.push(pixels); // Save the current state to history
    setPixels([]);
    redoHistory.current = []; // Clear redo history on new action
  };

  const handleUndo = (): void => {
    setPixels((prevPixels) => {
      if (history.current.length === 0) return prevPixels;
      const lastClickPixels = history.current.pop();
      if (lastClickPixels) {
        redoHistory.current.push([...prevPixels]); // Save current state to redo history
        const newPixels = prevPixels.filter(
          (pixel) =>
            !lastClickPixels.some(
              (lastPixel) => lastPixel.x === pixel.x && lastPixel.y === pixel.y
            )
        );
        return newPixels;
      }
      return prevPixels;
    });
  };

  const handleRedo = (): void => {
    setPixels((prevPixels) => {
      if (redoHistory.current.length === 0) return prevPixels;
      const nextClickPixels = redoHistory.current.pop();
      if (nextClickPixels) {
        history.current.push([...prevPixels]); // Save current state to undo history
        return nextClickPixels;
      }
      return prevPixels;
    });
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

    if (prefix === ShortcutPrefix.GridSize && position < gridSizes.length) {
      setGridSize({
        width: gridSizes[position],
        height: gridSizes[position],
      });
      return;
    }

    toast(`${prefix} + ${currentKey} is not registered.`);
  };

  useShortCut({
    onShortCut: handleShortCut,
  });

  return (
    <div
      className="container flex max-w-xl gap-4 flex-col justify-center p-8"
      onMouseUp={handleMouseUp}
    >
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
          className="text-center text-balance mb-2 text-muted-foreground"
          repeat={false}
        />
      </header>
      <div className="flex border-t border-t-muted-foreground/10 py-6 flex-col gap-4 duration-1000 animate-in fade-in-0 slide-in-from-bottom-10">
        <div className="flex gap-6 flex-wrap">
          <ControlsContainer title="Grid density">
            <GridDensityPicker gridSize={gridSize} setGridSize={setGridSize} />
          </ControlsContainer>
          <ControlsContainer title="Image">
            <ImageUpload image={image} onImageUpload={setImage} />
          </ControlsContainer>
          <ControlsContainer title="Shape">
            <ToggleGroup
              variant="outline"
              type="single"
              value={selectedShape}
              onValueChange={(v) => setSelectedShape(v as ShapeType)}
            >
              {shapeTypes.map((shape, index) => (
                <Shape
                  key={shape}
                  type={shape}
                  isSelected={shape === selectedShape}
                  shortcutIndex={index + 1}
                />
              ))}
            </ToggleGroup>
          </ControlsContainer>

          <ControlsContainer title="Mirror">
            <Symmetry mode={symmetryMode} onModeChange={setSymmetryMode} />
          </ControlsContainer>
          <ControlsContainer title="Color">
            <ColorPicker
              selectedColor={selectedColor}
              onColorChange={setSelectedColor}
            />
          </ControlsContainer>
        </div>

        <CanvasGrid
          width={gridSize.width}
          height={gridSize.height}
          pixels={pixels}
          onPixelClick={handlePixelClick}
          currentShape={selectedShape}
          currentColor={selectedColor}
          image={image}
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
          <div className="flex gap-2">
            <Button
              onClick={handleUndo}
              variant="outline"
              className="gap-2  "
            >
              <Undo className="size-4" />
              Undo
            </Button>
            <Button
              onClick={handleRedo}
              variant="secondary"
              className="gap-2  "
            >
              <Redo className="size-4" />
              Redo
            </Button>
          </div>
          <ExportButton pixels={pixels} gridSize={gridSize} />
        </div>
      </div>

      <div className="relative overflow-hidden mt-12 mb-2">
        <Marquee pauseOnHover>
          {previewImages.map((src) => {
            return (
              <img key={src} src={src} alt="preview" className="size-16" />
            );
          })}
        </Marquee>
      </div>
      <Toaster />
    </div>
  );
};

export default PixCell;
