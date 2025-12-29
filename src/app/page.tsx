"use server"

import Link from "next/link";
import { SignOutButton } from "~/components/client/signout";

export default async function HomePage() {
  return (
    <div className="min-h-screen bg-linear-to-l from-[#bbcdeb] to-[#f0f4fb] bg-white">
        <nav className="flex h-16 items-center justify-between border-b border-gray-200 px-10">
            <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gray-800 text-white">
                    VA
                </div>
                <span className="text-lg font-semibold">Sentiment Analyzer</span>
            </div>
            {/* <p className="text-sm font-bold">Sign out</p> */}
            <SignOutButton/>
        </nav>

    </div>
  );
}
