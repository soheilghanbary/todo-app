import { RocketIcon } from 'lucide-react';
import { Button } from './ui/button';

export function Hero() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-20">
      <h1 className="font-black text-4xl/snug">
        TodoNext: The Minimal Todo App
      </h1>
      <p className="text-lg text-muted-foreground">
        This Project made by Next.js 15 & Prisma & Server Action
      </p>
      <Button variant={'outline'} size={'lg'} className="mt-4 rounded-full">
        <RocketIcon />
        Get Started
      </Button>
    </div>
  );
}
