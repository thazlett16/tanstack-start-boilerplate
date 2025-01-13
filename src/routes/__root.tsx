import { createRootRouteWithContext } from "@tanstack/react-router";
import { Outlet, ScrollRestoration } from "@tanstack/react-router";
import { Meta, Scripts } from "@tanstack/start";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// import fontSourceInter from "@fontsource-variable/inter?url";

import {RouterContext} from "~/router";
// import { metaTags } from "~/util/meta";

import rootCss from "~/styles/root.css?url";

export const Route = createRootRouteWithContext<RouterContext>()({
    head: () => ({
        meta: [
            {
                charSet: "utf-8",
            },
            {
                name: "viewport",
                content: "width=device-width, initial-scale=1",
            },
            // ...metaTags({
            //     title: "i18n Translation App",
            //     description: `i18n Translation App for configuring your own app code.`,
            // }),
        ],
        links: [
            {
                rel: "stylesheet",
                href: rootCss
            },
            // {
            //     rel: "stylesheet",
            //     href: fontSourceInter
            // },
            // {
            //     rel: "apple-touch-icon",
            //     sizes: "180x180",
            //     href: "/apple-touch-icon.png",
            // },
            // {
            //     rel: "icon",
            //     type: "image/png",
            //     sizes: "32x32",
            //     href: "/favicon-32x32.png",
            // },
            // {
            //     rel: "icon",
            //     type: "image/png",
            //     sizes: "16x16",
            //     href: "/favicon-16x16.png",
            // },
            // {
            //     rel: "manifest",
            //     href: "/site.webmanifest",
            //     color: "#fffff"
            // },
            // {
            //     rel: "icon",
            //     href: "/favicon.ico"
            // },
        ],
    }),
    errorComponent: ({}) => {
        return <>Root Error</>
    },
    component: RootComponent,
});

function RootComponent() {
    return (
        <html className="font-sans">
            <head>
                <Meta />
            </head>
            <body>
                <div>Sans</div>
                <Outlet />
                <ScrollRestoration />
                <ReactQueryDevtools />
                <TanStackRouterDevtools position="bottom-left" />
                <Scripts />
            </body>
        </html>
    );
}
