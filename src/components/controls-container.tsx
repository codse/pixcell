import { cn } from '@/lib/utils';

interface ControlsContainerProps extends React.HTMLAttributes<HTMLDivElement> {}

export const ControlsContainer: React.FC<ControlsContainerProps> = ({
  className,
  children,
  title,
  ...props
}) => {
  return (
    <section title={title} className={cn('', className)} {...props}>
      <h2 className="text-sm">{title}</h2>
      {children}
    </section>
  );
};
