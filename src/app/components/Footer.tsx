import { ModeToggle } from '@/components/common/mode-toggle';
import { buttonVariants } from '@/components/ui/button';
import { Github } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto flex items-center justify-between px-4 py-2">
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
        <div className="flex items-center gap-2">
          <a
            href="https://github.com/soheilghanbary/todonext"
            target="_blank"
            rel="noreferrer"
            className={buttonVariants({ size: 'icon', variant: 'ghost' })}
          >
            <Github />
          </a>
          <ModeToggle />
        </div>
      </div>
    </footer>
  );
}
