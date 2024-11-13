export function Footer() {
  return (
    <footer className="sticky bottom-0 flex items-center justify-center border-t bg-background/80 py-2 backdrop-blur">
      <p className="text-muted-foreground text-xs">
        Developed by{' '}
        <a
          className="font-medium text-foreground underline"
          target="_blank"
          rel="noreferrer"
          href="https://soheilghanbary.ir"
        >
          Soheil Ghanbary
        </a>
      </p>
    </footer>
  );
}
