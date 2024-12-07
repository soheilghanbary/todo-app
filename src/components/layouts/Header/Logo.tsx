import { BadgeCheck } from 'lucide-react';
import Link from 'next/link';

export const Logo = () => (
  <Link href={'/'} className="flex items-center gap-1 font-bold text-primary">
    <BadgeCheck className="size-5" strokeWidth={2} />
    TodoNext
  </Link>
);
