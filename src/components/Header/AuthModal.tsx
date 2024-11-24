'use client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { useMediaQuery } from '@/hooks/use-media-query';
import { onSignIn } from '@/server/actions/auth.action';
import { LogInIcon } from 'lucide-react';
import type React from 'react';
import { useState, useTransition } from 'react';
import { LoadingIcon } from '../common/icons';
import { TextLine } from '../common/text-line';
import { Button } from '../ui/button';

const Auth = () => {
  const [pending, mutate] = useTransition();
  const [loading, setLoading] = useState({
    github: false,
    google: false,
  });

  const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    const provider = e.currentTarget.name;
    setLoading((prev) => ({ ...prev, [provider]: true }));
    mutate(async () => {
      await onSignIn(provider);
    });
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <Button name="github" disabled={pending} onClick={handleLogin}>
        {loading.github && (
          <LoadingIcon className="size-4 fill-primary-foreground" />
        )}
        GitHub
      </Button>
      <Button
        name="google"
        disabled={pending}
        variant={'outline'}
        onClick={handleLogin}
      >
        {loading.google && <LoadingIcon className="size-4 fill-primary" />}
        Google
      </Button>
    </div>
  );
};

export function AuthModal() {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  if (isDesktop) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button>
            <LogInIcon />
            Sign In
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Sign In your Account</DialogTitle>
            <DialogDescription>
              Sign in to your account to continue.
            </DialogDescription>
          </DialogHeader>
          <TextLine text="Sign in with" />
          <Auth />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>
          <LogInIcon />
          Sign In
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Sign In your Account</DrawerTitle>
          <DrawerDescription>
            Sign in to your account to continue.
          </DrawerDescription>
        </DrawerHeader>
        <div className="space-y-4 px-4">
          <TextLine text="Sign in with" />
          <Auth />
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
