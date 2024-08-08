import { ShortcutPrefix } from '@/lib/pixcell';
import { useEffect, useRef } from 'react';

const allowedPrefix = [
  ShortcutPrefix.Color,
  ShortcutPrefix.Shape,
  ShortcutPrefix.Symmetry,
  ShortcutPrefix.GridSize,
];

export const useShortCut = ({
  onShortCut,
}: {
  timeout?: number;
  onShortCut: (props: { currentKey: string; prefix: string | null }) => void;
}) => {
  const prefix = useRef<string | null>(null);

  useEffect(() => {
    const handleShortCut = (e: KeyboardEvent) => {
      onShortCut({
        currentKey: e.key,
        prefix: prefix.current,
      });

      if (
        allowedPrefix.includes(String(e.key).toLowerCase() as ShortcutPrefix)
      ) {
        // Track the prefix key pressed
        prefix.current = String(e.key).toLowerCase();
      }
    };

    const clearPrefix = (e: KeyboardEvent) => {
      if (
        prefix.current &&
        allowedPrefix.includes(e.key.toLowerCase() as ShortcutPrefix)
      ) {
        prefix.current = null;
      }
    };

    window.addEventListener('keydown', handleShortCut);
    window.addEventListener('keyup', clearPrefix);

    return () => {
      window.removeEventListener('keydown', handleShortCut);
      window.removeEventListener('keyup', clearPrefix);
    };
  }, [onShortCut]);
};
