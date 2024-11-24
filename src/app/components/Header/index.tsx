import { auth } from '@/server/auth';
import { TodoModal } from '../Todo/TodoModal';
import { AuthModal } from './AuthModal';
import { UserProfile } from './UserProfile';
import { Logo } from './Logo';

export async function Header() {
  const session = await auth();
  return (
    <header className="sticky top-0 z-50 border-b bg-card">
      <nav className="container flex items-center justify-between gap-4 px-4 py-2">
        <Logo />
        <div className="flex items-center gap-4">
          {session ? (
            <>
              <TodoModal />
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
