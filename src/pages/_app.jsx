import { SessionProvider, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import {
  QueryClientProvider,
  QueryClient,
  Hydrate,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import "../styles/index.css";

export default function App({ Component, pageProps }) {
  const queryClient = React.useRef(new QueryClient());

  return (
    <QueryClientProvider client={queryClient.current}>
      <Hydrate state={pageProps.dehydratedState}>
        <SessionProvider session={pageProps.session}>
          {Component.auth ? (
            <Protected>
              <Component {...pageProps} />
            </Protected>
          ) : (
            <Component {...pageProps} />
          )}
        </SessionProvider>
        <ReactQueryDevtools />
      </Hydrate>
    </QueryClientProvider>
  );
}

function Protected({ children }) {
  const { data, status } = useSession();
  if (status === "loading") {
    return (
      <h1 className="grid h-screen w-full place-content-center text-2xl">
        Loading...
      </h1>
    );
  }
  if (status === "unauthenticated") {
    return (
      <div className="grid h-screen w-full place-content-center place-items-center gap-4">
        <h1 className="text-3xl font-bold">You are not logged in! </h1>
        <button
          onClick={() => signIn("github")}
          className="flex w-fit items-center  justify-center gap-4 rounded-md bg-rose-400 py-2 px-4 font-bold text-slate-800  transition-colors "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
          <span>Sign in</span>
        </button>
      </div>
    );
  } else return <main className="px-4">{children}</main>;
}
