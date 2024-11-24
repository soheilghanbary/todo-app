'use client';
import { LoadingIcon } from '@/components/common/icons';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { onSignOut } from '@/server/actions/auth.action';
import { LogOut, MailIcon } from 'lucide-react';
import { useTransition } from 'react';

export const UserProfile = (props: {
  name: string;
  email: string;
  image: string;
}) => {
  const [pending, mutate] = useTransition();
  const handleLogout = () => {
    mutate(async () => {
      await onSignOut();
    });
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Avatar className="border bg-background shadow">
          <AvatarImage src={props.image} />
        </Avatar>
      </PopoverTrigger>
      <PopoverContent className="flex w-48 flex-col gap-2 p-2" align={'end'}>
        <p className="font-semibold text-sm">{props.name}</p>
        <p className="flex items-center gap-2 text-muted-foreground text-xs">
          <MailIcon className="size-4" strokeWidth={1.5} />
          {props.email}
        </p>
        <Separator className="bg-border/40" />
        <Button
          size={'sm'}
          className="w-full"
          disabled={pending}
          onClick={handleLogout}
          variant={'destructive'}
        >
          {pending ? (
            <LoadingIcon className="fill-primary-foreground" />
          ) : (
            <LogOut />
          )}
          Log Out
        </Button>
      </PopoverContent>
    </Popover>
  );
};
