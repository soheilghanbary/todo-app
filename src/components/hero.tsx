import { RocketIcon } from 'lucide-react';
import { Button } from './ui/button';

export function Hero() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-8 text-center lg:py-20">
      <h1 className="font-black text-2xl/snug lg:text-4xl/snug">
        The Minimal Todo App
      </h1>
      <p className="text-muted-foreground text-sm lg:text-lg">
        This Project made by Next.js 15
      </p>
      <Button asChild className="mt-4 rounded-full" variant={'outline'}>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://github.com/soheilghanbary/todonext"
        >
          <RocketIcon />
          Source Code
        </a>
      </Button>
    </div>
  );
}
