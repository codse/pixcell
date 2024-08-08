import React, { useEffect, useRef, useState } from 'react';
import { CanvasGridProps } from '@/types';
import { getClipPath } from '@/lib/pixcell';
import CursorTracker from '@/components/animata/container/cursor-tracker';
import { ShapeCursor } from '@/components/shape';
import { cn } from '@/lib/utils';

// import {
//   ContextMenu,
//   ContextMenuContent,
//   ContextMenuItem,
//   ContextMenuSeparator,
//   ContextMenuShortcut,
//   ContextMenuSub,
//   ContextMenuSubContent,
//   ContextMenuSubTrigger,
//   ContextMenuTrigger,
// } from './ui/context-menu';
// import { cn } from '@/lib/utils';

// /** Context menu is causing performance issues */
// <ContextMenu key={index}>
// <ContextMenuTrigger asChild>
// </ContextMenuTrigger>
// <ContextMenuContent>
//   <ContextMenuSub>
//     <ContextMenuSubTrigger>Color</ContextMenuSubTrigger>
//     <ContextMenuSubContent className="w-48">
//       {colors.map((color, index) => {
//         return (
//           <ContextMenuItem
//             key={color}
//             className={cn({
//               'bg-muted': pixel?.color === color,
//             })}
//             onClick={() => onPixelClick(x, y, { color })}
//           >
//             <span
//               className="w-4 h-4 rounded-full"
//               style={{ backgroundColor: color }}
//             />
//             <ContextMenuShortcut>
//               {ShortcutPrefix.Color.toUpperCase()}+{index + 1}
//             </ContextMenuShortcut>
//           </ContextMenuItem>
//         );
//       })}
//     </ContextMenuSubContent>
//   </ContextMenuSub>
//   <ContextMenuSeparator />
//   <ContextMenuSub>
//     <ContextMenuSubTrigger>Shape</ContextMenuSubTrigger>
//     <ContextMenuSubContent className="w-48">
//       {shapeTypes.map((shape, index) => {
//         return (
//           <ContextMenuItem
//             key={shape}
//             onClick={() => onPixelClick(x, y, { shape })}
//           >
//             <ShapeCursor
//               type={shape}
//               className="p-1 w-9 h-9 me-auto"
//               isSelected={pixel?.shape === shape}
//             />
//             <ContextMenuShortcut>
//               {ShortcutPrefix.Shape.toUpperCase()}+{index + 1}
//             </ContextMenuShortcut>
//           </ContextMenuItem>
//         );
//       })}
//     </ContextMenuSubContent>
//   </ContextMenuSub>
// </ContextMenuContent>
// </ContextMenu>

export const CanvasGrid: React.FC<CanvasGridProps> = ({
  width,
  height,
  pixels,
  onPixelClick,
  currentShape,
  currentColor,
  image,
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
  const [size, setSize] = useState(24);

  useEffect(() => {
    const cell = document.querySelector('.grid-cell');
    if (cell) {
      setSize(cell.getBoundingClientRect().width);
    }
  }, [width, height]);

  const onMove = (target: HTMLElement) => {
    if (target && target.classList.contains('grid-cell')) {
      const x = target.dataset.x;
      const y = target.dataset.y;
      const active = target.dataset.active === 'true';
      if (x !== undefined && y !== undefined && isDragging.current && !active) {
        onPixelClick(+x, +y);
      }
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    const target = document.elementFromPoint(touch.clientX, touch.clientY);
    onMove(target as HTMLElement);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    onMove(target);
  };

  return (
    <CursorTracker
      tooltip={
        <ShapeCursor
          className="border-none bg-transparent p-px"
          type={currentShape}
          color={currentColor}
          isSelected
          style={{
            width: size,
            height: size,
          }}
        />
      }
      tooltipClassName="bg-transparent p-0 m-0 aspect-square"
      onMouseDown={() => (isDragging.current = true)}
      onMouseUp={() => (isDragging.current = false)}
      onMouseLeave={() => (isDragging.current = false)}
      onTouchStart={() => (isDragging.current = true)}
      onTouchEnd={() => (isDragging.current = false)}
      onTouchMove={handleTouchMove}
      onMouseMove={handleMouseMove}
      style={gridStyle}
      draggable={false}
      className="group relative mx-auto p-0 rounded-none my-4 aspect-square w-full bg-transparent border border-foreground/50 "
    >
      <div className="absolute inset-0 w-full h-full bg-foreground/10" />
      {!!image && (
        <img
          src={image as string}
          alt="Uploaded"
          draggable={false}
          className="w-full h-full absolute opacity-50 z-10 object-cover pointer-events-none"
        />
      )}
      {Array.from({ length: width * height }).map((_, index) => {
        const x = index % width;
        const y = Math.floor(index / width);
        const pixel = pixels.find((p) => p.x === x && p.y === y);
        return (
          <button
            key={index}
            data-active={!!pixel}
            data-x={x}
            data-y={y}
            draggable={false}
            className={cn(
              'cursor-pointer grid-cell relative bg-background/95',
              {
                'focus:bg-foreground/10': !pixel?.color,
              }
            )}
            onClick={() => onPixelClick(x, y)}
          >
            {!!pixel?.color && (
              <span
                style={{
                  backgroundColor: pixel?.color,
                  clipPath: getClipPath(pixel?.shape),
                }}
                className={cn('absolute inset-0', {})}
              />
            )}
          </button>
        );
      })}

      {/** Horizontal and vertical lines */}
      <div className="absolute top-1/2 h-px w-full pointer-events-none -translate-y-0 group-hover:bg-foreground/30" />
      <div className="absolute left-1/2 h-full w-px pointer-events-none -translate-x-0 group-hover:bg-foreground/30" />
    </CursorTracker>
  );
};
