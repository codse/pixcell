import { GridSize, Pixel, ShapeType, SymmetryMode } from '@/types';

export const getClipPath = (shapeType?: ShapeType) => {
  switch (shapeType) {
    case 'triangle':
      return 'polygon(50% 0%, 0% 100%, 100% 100%)';
    case 'circle':
      return 'circle(50%)';
    case 'diamond':
      return 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)';
    case 'hexagon':
      return 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)';
    default:
      return 'none';
  }
};

export const colors = [
  '#000000',
  '#dfdfdf',
  '#475569',
  '#22c55e',
  '#c2410c',
  '#d97706',
  '#7c3aed',
  '#a3e635',
  '#ec4899',
  '#60a5fa',
  '#f0abfc',
  '#ca8a04',
  '#8b5cf6',
  '#ffffff',
] as const;

export enum ShortcutPrefix {
  Color = 'c',
  Shape = 's',
  Symmetry = 'm',
}

export function getSymmetryPoints(
  x: number,
  y: number,
  gridSize: GridSize,
  mode: SymmetryMode
): { x: number; y: number }[] {
  switch (mode) {
    case 'none':
      return [{ x, y }];
    case 'mirror':
      return [
        { x, y },
        { x: gridSize.width - 1 - x, y },
      ];
    case 'grid':
      return [
        { x, y },
        { x: gridSize.width - 1 - x, y },
        { x, y: gridSize.height - 1 - y },
        { x: gridSize.width - 1 - x, y: gridSize.height - 1 - y },
      ];
    default:
      return [{ x, y }];
  }
}

export const shapeTypes: ShapeType[] = [
  'square',
  'triangle',
  'circle',
  'diamond',
  'hexagon',
];

export const exportPNG = (pixels: Pixel[], gridSize: GridSize) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const pixelSize = 24;

  canvas.width = gridSize.height * pixelSize;
  canvas.height = gridSize.height * pixelSize;

  // Fill the background with white
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  pixels.forEach((pixel) => {
    const x = pixel.x * pixelSize;
    const y = pixel.y * pixelSize;

    ctx.fillStyle = pixel.color;
    ctx.beginPath();

    switch (pixel.shape) {
      case 'square':
        ctx.rect(x, y, pixelSize, pixelSize);
        break;
      case 'triangle':
        ctx.moveTo(x + pixelSize / 2, y);
        ctx.lineTo(x, y + pixelSize);
        ctx.lineTo(x + pixelSize, y + pixelSize);
        break;
      case 'circle':
        ctx.arc(
          x + pixelSize / 2,
          y + pixelSize / 2,
          pixelSize / 2,
          0,
          2 * Math.PI
        );
        break;
      case 'diamond':
        ctx.moveTo(x + pixelSize / 2, y);
        ctx.lineTo(x + pixelSize, y + pixelSize / 2);
        ctx.lineTo(x + pixelSize / 2, y + pixelSize);
        ctx.lineTo(x, y + pixelSize / 2);
        break;
      case 'hexagon':
        {
          const a = pixelSize / 4;
          const b = pixelSize / 2;
          ctx.moveTo(x + a, y);
          ctx.lineTo(x + pixelSize - a, y);
          ctx.lineTo(x + pixelSize, y + b);
          ctx.lineTo(x + pixelSize - a, y + pixelSize);
          ctx.lineTo(x + a, y + pixelSize);
          ctx.lineTo(x, y + b);
        }
        break;
    }

    ctx.closePath();
    ctx.fill();
  });

  canvas.toBlob((blob) => {
    if (blob) {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'pixel_art.png';
      a.click();
      URL.revokeObjectURL(url);
    }
  });
};

export const exportSVG = (pixels: Pixel[], gridSize: GridSize): void => {
  const { width, height } = gridSize;
  const pixelSize = 10; // Size of each pixel in the SVG

  let svgContent = `<svg width="${width * pixelSize}" height="${
    height * pixelSize
  }" xmlns="http://www.w3.org/2000/svg">`;

  // Add a white background
  svgContent += "<rect width='100%' height='100%' fill='white'/>";

  // Add each pixel as its corresponding shape
  pixels.forEach((pixel) => {
    const x = pixel.x * pixelSize;
    const y = pixel.y * pixelSize;

    switch (pixel.shape) {
      case 'square':
        svgContent += `<rect x="${x}" y="${y}" width="${pixelSize}" height="${pixelSize}" fill="${pixel.color}"/>`;
        break;
      case 'triangle':
        svgContent += `<polygon points="${x + pixelSize / 2},${y} ${x},${
          y + pixelSize
        } ${x + pixelSize},${y + pixelSize}" fill="${pixel.color}"/>`;
        break;
      case 'circle':
        svgContent += `<circle cx="${x + pixelSize / 2}" cy="${
          y + pixelSize / 2
        }" r="${pixelSize / 2}" fill="${pixel.color}"/>`;
        break;
      case 'diamond':
        svgContent += `<polygon points="${x + pixelSize / 2},${y} ${
          x + pixelSize
        },${y + pixelSize / 2} ${x + pixelSize / 2},${y + pixelSize} ${x},${
          y + pixelSize / 2
        }" fill="${pixel.color}"/>`;
        break;
      case 'hexagon':
        {
          const a = pixelSize / 4;
          const b = pixelSize / 2;
          svgContent += `<polygon points="${x + a},${y} ${
            x + pixelSize - a
          },${y} ${x + pixelSize},${y + b} ${x + pixelSize - a},${
            y + pixelSize
          } ${x + a},${y + pixelSize} ${x},${y + b}" fill="${pixel.color}"/>`;
        }
        break;
    }
  });

  svgContent += '</svg>';

  const blob = new Blob([svgContent], { type: 'image/svg+xml' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.download = 'pixel-art.svg';
  link.href = url;
  link.click();

  URL.revokeObjectURL(url);
};
