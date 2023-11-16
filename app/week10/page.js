"use client";

import { useUserAuth } from "./_utils/auth-context";
import ShoppingList from "./shopping-list/page.js";

export default function Page() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

  async function handleSignIn() {
    await gitHubSignIn();
  }

  async function handleSignOut() {
    await firebaseSignOut();
  }

  return (
    <>
      {user ? (
        <div className="bg-slate-900 text-white h-20">
          <p>Welcome {user.displayName}</p>
          <p>{user.email}</p>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      ) : (
        <div className="bg-slate-900 text-white h-20">
          <button onClick={handleSignIn}>Sign In</button>
        </div>
      )}
      <ShoppingList />
    </>
  )
}
 