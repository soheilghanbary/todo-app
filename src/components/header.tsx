import { auth } from '@/server/auth';
import Link from 'next/link';
import { AddTodo } from './add-todo';
import { AuthModal } from './auth-modal';
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
        <div className="flex items-center gap-4">
          {session ? (
            <>
              <AddTodo />
              <UserProfile {...session.user} />
            </>
          ) : (
            <AuthModal />
          )}
        </div>
      </nav>
    </header>
  );
}
