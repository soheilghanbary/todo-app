export function Footer() {
  return (
    <footer className="sticky bottom-0 z-40 flex items-center justify-center border-border/40 border-t bg-background/80 py-2 backdrop-blur">
      <p className="text-muted-foreground text-xs">
        Developed by{' '}
        <a
          target="_blank"
          rel="noreferrer"
          href="https://soheilghanbary.ir"
          className="font-medium text-foreground underline decoration-wavy underline-offset-4"
        >
          Soheil Ghanbary
        </a>
      </p>
    </footer>
  );
}
