import React from "react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
function Navbar({ user }) {
  return (
    <nav className="my-4 flex items-center justify-between">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold">
          <Link href="/"> PollSite </Link>
        </h1>
        <ul className="px-8">
          <li>
            <Link href="/my"> my </Link>
          </li>
        </ul>
      </div>

      <div className="flex items-center">
        <Image
          src={user.image}
          width={40}
          height={40}
          className="rounded-full"
        />
        <span className="px-2 text-gray-300">{user.email}</span>
        <button
          onClick={() => signOut()}
          className="flex w-fit items-center justify-center gap-4 rounded-md bg-rose-500 py-1 px-4 font-bold text-slate-800  transition-colors "
        >
          Sign Out
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
