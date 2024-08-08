type ShapeType = 'square' | 'triangle' | 'circle' | 'diamond' | 'hexagon';

type SymmetryMode = 'none' | 'mirror' | 'grid';

interface GridSize {
  width: number;
  height: number;
}

interface Pixel {
  x: number;
  y: number;
  color: string;
  shape: ShapeType;
}

interface ShapeProps {
  type: ShapeType;
  isSelected?: boolean;
  onClick?: () => void;
  className?: string;
  color?: string;
  style?: React.CSSProperties;
}

interface CanvasGridProps {
  width: number;
  height: number;
  pixels: Pixel[];
  onPixelClick: (x: number, y: number) => void;
  currentShape: ShapeType;
  currentColor: string;
}

interface ColorPickerProps {
  selectedColor: string;
  onColorChange: (color: string) => void;
}

interface ExportButtonProps {
  pixels: Pixel[];
  gridSize: GridSize;
}

interface SymmetryProps {
  mode: SymmetryMode;
  onModeChange: (mode: SymmetryMode) => void;
}

export type {
  ShapeType,
  SymmetryMode,
  GridSize,
  Pixel,
  ShapeProps,
  CanvasGridProps,
  ColorPickerProps,
  ExportButtonProps,
  SymmetryProps,
};
