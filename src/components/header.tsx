import { auth } from '@/server/auth';
import Link from 'next/link';
import { AuthModal } from './auth-modal';
import { ModeToggle } from './common/mode-toggle';
import { UserProfile } from './user-profile';

const Logo = () => (
  <Link href={'/'} className="flex items-center gap-1">
    <p className="font-extrabold">TodoNext</p>
  </Link>
);

export async function Header() {
  const session = await auth();
  return (
    <header className="flex items-center justify-between gap-4">
      <Logo />
      <div className="flex items-center gap-4">
        <ModeToggle />
        {session ? <UserProfile {...session.user} /> : <AuthModal />}
      </div>
    </header>
  );
}
