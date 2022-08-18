import { SessionProvider, signIn, useSession } from "next-auth/react"
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { QueryClientProvider, QueryClient, Hydrate } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import "../styles/index.css"

export default function App({ Component, pageProps }) {
    const queryClient = React.useRef(new QueryClient())

    return (
        <QueryClientProvider client={queryClient.current}>
            <Hydrate state={pageProps.dehydratedState}>
                <SessionProvider session={pageProps.session}>
                    {
                        Component.auth ?
                            (<Protected>
                                <Component {...pageProps} />
                            </Protected>)
                            : (<Component {...pageProps} />)
                    }
                </SessionProvider>
                <ReactQueryDevtools />
            </Hydrate>
        </QueryClientProvider>
    )
    // return (
    //     <QueryClientProvider client={queryClient}>
    //         <Hydrate state={pageProps.dehydratedState}>
    //             <SessionProvider session={session}>
    //                 {
    //                     Component.auth ?
    //                         (<Protected><Component {...pageProps} /></Protected>)
    //                         : (<Component {...pageProps} />)
    //                 }
    //             </SessionProvider>
    //             <ReactQueryDevtools initialIsOpen />
    //         </Hydrate>
    //     </QueryClientProvider>
    // )
}

function SendToLogin() {
    const router = useRouter();

    useEffect(() => {
        router.push('/login')
    }, []);
    return "You need to log in"
}

function Protected({ children }) {
    const { data, status } = useSession();
    if (status === "loading") {
        return <div>Loading...</div>
    }
    if (status === "unauthenticated") {
        return (
            <div>
                You are not logged in! from _app.jsx <br />
                <button onClick={() => signIn()}>Sign in</button>
            </div>
        );
    } else return children;
}