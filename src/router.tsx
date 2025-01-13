import { QueryClient } from '@tanstack/react-query'
import { createRouter as createTanStackRouter, isRedirect } from '@tanstack/react-router'
import { routerWithQueryClient } from '@tanstack/react-router-with-query'

import { routeTree } from '~/route-tree.gen'

export type RouterContext = {
    queryClient: QueryClient
}

export function createRouter() {
    // if (typeof window !== "undefined") {
    //     notifyManager.setScheduler(window.requestAnimationFrame);
    // }

    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                // With SSR, we usually want to set some default staleTime
                // above 0 to avoid refetching immediately on the client
                staleTime: 60 * 1000,
                // refetchOnReconnect: (query) => !queryClient.isMutating(),
            },
        },
        // mutationCache: new MutationCache({
        //     onError: (error) => {
        //         // toast(error.message, { className: "bg-red-500 text-white" });
        //     },
        //     onSettled: () => {
        //         // if (queryClient.isMutating() === 1) {
        //         //     return queryClient.invalidateQueries();
        //         // }
        //     },
        // }),
    })

    const routerContext: RouterContext = {
        queryClient,
    }

    const router = createTanStackRouter({
        routeTree,
        defaultPreload: false,
        // defaultPreload: "intent",
        // defaultErrorComponent: DefaultCatchBoundary,
        defaultNotFoundComponent: () => <>NOT FOUND</>,
        defaultPreloadStaleTime: 0,
        search: {
            strict: true,
        },
        context: routerContext,
    })

    // // handle redirect without useServerFn when using tanstack query
    // queryClient.getQueryCache().config.onError = handleRedirectError
    // queryClient.getMutationCache().config.onError = handleRedirectError
    //
    // function handleRedirectError(error: Error) {
    //     if (isRedirect(error)) {
    //         router.navigate(
    //             router.resolveRedirect({
    //                 ...error,
    //                 _fromLocation: router.state.location,
    //             }),
    //         )
    //     }
    // }

    return routerWithQueryClient(router, queryClient)
}

declare module '@tanstack/react-router' {
    interface Register {
        router: ReturnType<typeof createRouter>
    }
}
