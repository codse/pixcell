import { FlipHorizontal, Grid2X2, Square } from 'lucide-react';

export const modes = [
  {
    title: 'None',
    icon: <Square />,
    mode: 'none',
  },
  {
    title: 'Horizontal',
    icon: <FlipHorizontal />,
    mode: 'mirror',
  },
  {
    title: 'Grid',
    icon: <Grid2X2 />,
    mode: 'grid',
  },
] as const;
