import { auth } from '@/server/auth';
import { Github } from 'lucide-react';
import Link from 'next/link';
import { AuthModal } from './auth-modal';
import { ModeToggle } from './common/mode-toggle';
import { buttonVariants } from './ui/button';
import { UserProfile } from './user-profile';

const Logo = () => (
  <Link href={'/'} className="flex items-center gap-1">
    <p className="font-extrabold">TodoNext</p>
  </Link>
);

export async function Header() {
  const session = await auth();
  return (
    <header className="sticky top-0 z-50 border-border/40 border-b bg-card">
      <nav className="container flex items-center justify-between gap-4 px-4 py-2">
        <Logo />
        <div className="flex items-center gap-2">
          <ModeToggle />
          <a
            href="https://github.com/soheilghanbary/todonext"
            target="_blank"
            rel="noreferrer"
            className={buttonVariants({ size: 'icon', variant: 'ghost' })}
          >
            <Github />
          </a>
          {session ? <UserProfile {...session.user} /> : <AuthModal />}
        </div>
      </nav>
    </header>
  );
}
