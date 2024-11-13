export const TextLine = ({ text = '' }) => (
  <div className="relative">
    <div className="absolute inset-0 flex items-center">
      <span className="w-full border-t" />
    </div>
    <div className="relative flex justify-center text-xs uppercase">
      <span className="bg-card px-2 text-muted-foreground md:bg-card">
        {text}
      </span>
    </div>
  </div>
);
