"use server"

import Link from "next/link";
import CodeExamples from "~/components/client/code-examples";
import CopyButton from "~/components/client/copy-button";
import Inference from "~/components/client/inference";
import { SignOutButton } from "~/components/client/signout";
import { auth } from "~/server/auth";
import { db } from "~/server/db";

export default async function HomePage() {
  const session = await auth();

  if (!session?.user.id) {
    throw new Error("User not authenticated");
  }

  const quota = await db.apiQuota.findUniqueOrThrow({
    where: {
      userId: session.user.id,
    },
  });

  return (
    <div className="min-h-screen bg-white">
        <nav className="flex h-16 items-center justify-between border-b border-gray-200 px-10">
            <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gray-800 text-white">
                    VA
                </div>
                <span className="text-lg font-semibold">Sentiment Analyzer</span>
            </div>
            
            <SignOutButton/>
        </nav>

        <main className="flex min-h-screen w-full flex-col gap-6 p-4 sm:p-10 md:flex-row">
          <Inference quota={{ secretKey: quota.secretKey}} />
          <div className="flex h-fit w-full flex-col gap-3 md:w-1/2"></div>
          <div className="hidden border-l border-slate-200 md:block"></div>
          <div className="flex h-fit w-full flex-col gap-3 md:w-1/2">
            <h2 className="text-lg font-medium-text-slate-800"> API</h2>
            <div className="mt-3 flex h-fit w-full flex-col rounded-xl bg-[#eeebdda3] bg-opacity-70 p-4">
              <span className="text-sm">Secret key</span>
              <span className="text-sm text-gray-500">This key should be used when calling the Analyzer API and should remain private.</span>
              <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-sm">Key</span>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="w-full max-w-[200px] overflow-x-auto rounded-lg border border-gray-200 px-3 py-1 text-sm text-gray-600 sm:w-auto">
                    {quota.secretKey}
                  </span>
                  <CopyButton text={quota.secretKey}></CopyButton>
                </div>
              </div>
            </div>

            <div className="mt-3 flex h-fit w-full flex-col rounded-xl bg-[#eeebdda3] bg-opacity-70 p-4">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-sm">Montly quota</span>
                <span className="w-full max-w-[200px] overflow-x-auto rounded-lg border border-gray-200 px-3 py-1 text-sm text-gray-600 sm:w-auto">
                      {quota.requestUsed} / {quota.maxRequests} requests
                </span>
              </div>
              <div className="mt-1 h-1 w-full rounded-full bg-[#bab8aea3]">
                <div style={{
                  width: (quota.requestUsed / quota.maxRequests) * 100 + "%"
                }} className="h-1 rounded-full bg-[#54534ff1]"></div>
              </div>
            </div>
            <CodeExamples></CodeExamples>
          </div>
        </main>

    </div>
  );
}