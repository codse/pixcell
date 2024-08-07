import React from 'react';
import { ExportButtonProps } from '@/types';
import { exportPNG, exportSVG } from '@/lib/pixie';
import { Download, ImageDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const ExportButton: React.FC<ExportButtonProps> = ({
  pixels,
  gridSize,
}) => {
  const exportImage = (type: 'normal' | 'svg'): void => {
    if (type === 'svg') {
      exportSVG(pixels, gridSize);
    } else {
      exportPNG(pixels, gridSize);
    }
  };

  return (
    <div className="space-x-2 flex-shrink-0">
      <Button onClick={() => exportImage('normal')} className="gap-2">
        <ImageDown className="size-4" /> PNG
      </Button>
      <Button onClick={() => exportImage('svg')} className="gap-2">
        <Download className="size-4" /> SVG
      </Button>
    </div>
  );
};
