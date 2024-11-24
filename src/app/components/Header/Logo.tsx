import Link from 'next/link';

export const Logo = () => (
  <Link href={'/'} className="flex items-center gap-1">
    <p className="font-extrabold">TodoNext</p>
  </Link>
);
