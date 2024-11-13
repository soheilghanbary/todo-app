'use server';
import { signIn, signOut } from '../auth';

export const onSignIn = async (provider: string) => {
  return await signIn(provider);
};

export const onSignOut = async () => {
  return await signOut();
};
