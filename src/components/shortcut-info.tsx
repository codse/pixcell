export const ShortCutInfo = ({
  prefix,
  item,
}: {
  prefix: string;
  item: string | number;
}) => {
  return (
    <div className="flex items-center gap-1 text-[10px] px-1.5 py-1 rounded-md bg-background text-foreground">
      <span>Press</span>
      <kbd className="rounded-sm aspect-square flex items-center bg-muted border border-muted-foreground/40 text-muted-foreground/80 px-1.5 uppercase">
        {prefix}
      </kbd>
      <span>+</span>
      <kbd className="rounded-sm aspect-square flex items-center bg-muted border border-muted-foreground/40 text-muted-foreground/80 px-1.5 uppercase">
        {item}
      </kbd>
    </div>
  );
};
