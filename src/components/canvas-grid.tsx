import React, { useRef } from 'react';
import { CanvasGridProps } from '@/types';
import { getClipPath } from '@/lib/pixcell';
import CursorTracker from '@/components/animata/container/cursor-tracker';
import { Shape } from '@/components/shape';

export const CanvasGrid: React.FC<CanvasGridProps> = ({
  width,
  height,
  pixels,
  onPixelClick,
  currentShape,
  currentColor,
}) => {
  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: `repeat(${width}, 1fr)`,
    gridTemplateRows: `repeat(${height}, 1fr)`,
    width: '100%',
    gap: '1px',
    aspectRatio: `${width} / ${height}`,
  };
  const isDragging = useRef(false);

  return (
    <CursorTracker
      tooltip={
        <Shape
          className="h-6 w-6 border-none bg-transparent"
          type={currentShape}
          color={currentColor}
          isSelected
          onClick={() => {}}
        />
      }
      tooltipClassName="bg-transparent p-0 m-0 aspect-square"
      onMouseDown={() => (isDragging.current = true)}
      onMouseUp={() => (isDragging.current = false)}
      onMouseLeave={() => (isDragging.current = false)}
      style={gridStyle}
      draggable={false}
      className="group relative  mx-auto p-0  rounded-none my-4 aspect-square w-full bg-foreground/10 border border-foreground/50 "
    >
      {Array.from({ length: width * height }).map((_, index) => {
        const x = index % width;
        const y = Math.floor(index / width);
        const pixel = pixels.find((p) => p.x === x && p.y === y);
        return (
          <button
            key={index}
            draggable={false}
            onMouseMove={() => {
              if (isDragging.current && !pixel) {
                onPixelClick(x, y);
              }
            }}
            className={
              'cursor-pointer relative bg-background focus:bg-foreground/30'
            }
            style={{
              backgroundColor: pixel?.color,
              clipPath: getClipPath(pixel?.shape),
            }}
            onClick={() => onPixelClick(x, y)}
          />
        );
      })}
      <div className="absolute top-1/2 h-px w-full -translate-y-0 group-hover:bg-foreground/30" />
      <div className="absolute left-1/2 h-full w-px -translate-x-0 group-hover:bg-foreground/30" />
    </CursorTracker>
  );
};
