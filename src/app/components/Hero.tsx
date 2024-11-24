import { Button } from '@/components/ui/button';
import { RocketIcon } from 'lucide-react';

export function Hero() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-8 text-center lg:py-20">
      <h1 className="max-w-4xl font-black text-2xl/snug md:text-4xl/snug lg:text-6xl/snug">
        Simplify <span className="text-primary">Task Management</span> with
        Next.js 15 & Prisma
      </h1>
      <p className="mx-auto max-w-2xl text-balance text-muted-foreground text-sm lg:text-lg">
        A fast, minimal to-do app built with Next.js 15 and Prisma for seamless
        task organization.
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
