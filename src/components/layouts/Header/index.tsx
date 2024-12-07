import TodoModal from '@/components/features/todo/TodoModal';
import { auth } from '@/server/auth';
import { AuthModal } from './AuthModal';
import { Logo } from './Logo';
import { UserProfile } from './UserProfile';

export default async () => {
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
};
